<?php
// PHP + MySQL CRUD for Places (Assignment 13)
require_once '../config/db.php';
require_once '../session.php';

requireAdmin();

$msg = '';
$action = isset($_GET['action']) ? $_GET['action'] : 'list';
$edit_place = null;

// Handle DELETE
if (isset($_GET['delete_id'])) {
    $delete_id = intval($_GET['delete_id']);
    $stmt = $conn->prepare("DELETE FROM places WHERE id = ?");
    $stmt->bind_param("i", $delete_id);
    if ($stmt->execute()) {
        $msg = "Place deleted successfully!";
    }
    $stmt->close();
}

// Handle ADD or EDIT POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $category = trim($_POST['category']);
    $short_desc = trim($_POST['short_description']);
    $full_desc = trim($_POST['full_description']);
    $location = trim($_POST['location']);
    $image = trim($_POST['image']);
    $is_hidden = isset($_POST['is_hidden_gem']) ? 1 : 0;

    if (isset($_POST['place_id']) && !empty($_POST['place_id'])) {
        // UPDATE
        $id = intval($_POST['place_id']);
        $stmt = $conn->prepare("UPDATE places SET name=?, category=?, short_description=?, full_description=?, location=?, image=?, is_hidden_gem=? WHERE id=?");
        $stmt->bind_param("ssssssii", $name, $category, $short_desc, $full_desc, $location, $image, $is_hidden, $id);
        if ($stmt->execute()) {
            $msg = "Place updated successfully!";
            $action = 'list';
        }
    } else {
        // INSERT
        $stmt = $conn->prepare("INSERT INTO places (name, category, short_description, full_description, location, image, is_hidden_gem) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssi", $name, $category, $short_desc, $full_desc, $location, $image, $is_hidden);
        if ($stmt->execute()) {
            $msg = "New place added successfully!";
            $action = 'list';
        }
    }
}

// Fetch place if editing
if ($action === 'edit' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $res = $conn->query("SELECT * FROM places WHERE id = $id");
    if ($res) {
        $edit_place = $res->fetch_assoc();
    }
}

// Fetch list of places
$result = $conn->query("SELECT * FROM places ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Places - PHP CRUD (Assignment 13)</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-navbar">
        <h2>Explore Nashik - Admin CRUD</h2>
        <div>
            <a href="index.php">Dashboard</a>
            <a href="places_manage.php" style="border-bottom: 2px solid white;">Manage Places</a>
            <a href="../logout.php">Logout</a>
        </div>
    </div>

    <div class="admin-body">
        <?php if ($msg): ?>
            <div class="alert alert-success"><?php echo $msg; ?></div>
        <?php endif; ?>

        <?php if ($action === 'add' || $action === 'edit'): ?>
            <h2><?php echo $action === 'edit' ? 'Edit Place' : 'Add New Nashik Place'; ?></h2>
            <div style="background: white; padding: 24px; border-radius: 8px; max-width: 600px;">
                <form method="POST" action="places_manage.php">
                    <?php if ($edit_place): ?>
                        <input type="hidden" name="place_id" value="<?php echo $edit_place['id']; ?>">
                    <?php endif; ?>

                    <div class="form-group">
                        <label>Place Name</label>
                        <input type="text" name="name" required value="<?php echo $edit_place ? htmlspecialchars($edit_place['name']) : ''; ?>">
                    </div>

                    <div class="form-group">
                        <label>Category</label>
                        <select name="category">
                            <?php
                            $cats = ['Historical', 'Religious', 'Nature', 'Heritage', 'Adventure', 'Cultural', 'Hidden Gems', 'Famous Landmarks'];
                            foreach ($cats as $cat) {
                                $sel = ($edit_place && $edit_place['category'] === $cat) ? 'selected' : '';
                                echo "<option value='$cat' $sel>$cat</option>";
                            }
                            ?>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Short Description</label>
                        <input type="text" name="short_description" required value="<?php echo $edit_place ? htmlspecialchars($edit_place['short_description']) : ''; ?>">
                    </div>

                    <div class="form-group">
                        <label>Full Detailed Description</label>
                        <textarea name="full_description" rows="4"><?php echo $edit_place ? htmlspecialchars($edit_place['full_description']) : ''; ?></textarea>
                    </div>

                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" name="location" required value="<?php echo $edit_place ? htmlspecialchars($edit_place['location']) : ''; ?>">
                    </div>

                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" name="image" required value="<?php echo $edit_place ? htmlspecialchars($edit_place['image']) : ''; ?>">
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="is_hidden_gem" value="1" <?php echo ($edit_place && $edit_place['is_hidden_gem']) ? 'checked' : ''; ?>> Is Hidden Gem?
                        </label>
                    </div>

                    <button type="submit" class="btn">Save Place</button>
                    <a href="places_manage.php" class="btn btn-secondary">Cancel</a>
                </form>
            </div>
        <?php else: ?>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>All Nashik Places</h2>
                <a href="places_manage.php?action=add" class="btn">+ Add Place</a>
            </div>

            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Hidden Gem?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($result && $result->num_rows > 0): ?>
                        <?php while ($row = $result->fetch_assoc()): ?>
                            <tr>
                                <td><?php echo $row['id']; ?></td>
                                <td><strong><?php echo htmlspecialchars($row['name']); ?></strong></td>
                                <td><?php echo htmlspecialchars($row['category']); ?></td>
                                <td><?php echo htmlspecialchars($row['location']); ?></td>
                                <td><?php echo $row['is_hidden_gem'] ? 'Yes' : 'No'; ?></td>
                                <td>
                                    <a href="places_manage.php?action=edit&id=<?php echo $row['id']; ?>" class="btn" style="padding: 4px 10px; font-size: 0.8rem;">Edit</a>
                                    <a href="places_manage.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Are you sure you want to delete this place?');" class="btn btn-danger" style="padding: 4px 10px; font-size: 0.8rem;">Delete</a>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <tr><td colspan="6">No places found in database.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</body>
</html>
