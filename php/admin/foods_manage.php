<?php
// PHP + MySQL CRUD for Taste of Nashik Food Items (Assignment 13)
require_once '../config/db.php';
require_once '../session.php';

requireAdmin();

$msg = '';

if (isset($_GET['delete_id'])) {
    $delete_id = intval($_GET['delete_id']);
    $stmt = $conn->prepare("DELETE FROM food WHERE id = ?");
    $stmt->bind_param("i", $delete_id);
    if ($stmt->execute()) {
        $msg = "Food item deleted!";
    }
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $category = trim($_POST['category']);
    $description = trim($_POST['description']);
    $popularity = trim($_POST['popularity_indicator']);
    $image = trim($_POST['image']);

    $stmt = $conn->prepare("INSERT INTO food (name, category, description, popularity_indicator, image) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $category, $description, $popularity, $image);
    if ($stmt->execute()) {
        $msg = "Food item added successfully!";
    }
}

$result = $conn->query("SELECT * FROM food ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Manage Food - PHP CRUD (Assignment 13)</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-navbar">
        <h2>Explore Nashik - Admin CRUD</h2>
        <div>
            <a href="index.php">Dashboard</a>
            <a href="foods_manage.php" style="border-bottom: 2px solid white;">Manage Food</a>
            <a href="../logout.php">Logout</a>
        </div>
    </div>

    <div class="admin-body">
        <?php if ($msg): ?><div class="alert alert-success"><?php echo $msg; ?></div><?php endif; ?>

        <h2>Add Food Item</h2>
        <div style="background: white; padding: 24px; border-radius: 8px; max-width: 600px; margin-bottom: 30px;">
            <form method="POST" action="foods_manage.php">
                <div class="form-group"><label>Food Name</label><input type="text" name="name" required placeholder="e.g. Nashik Misal Pav"></div>
                <div class="form-group"><label>Category</label>
                    <select name="category">
                        <option value="Snacks">Snacks</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Sweets">Sweets</option>
                        <option value="Street Food">Street Food</option>
                        <option value="Beverage">Beverage</option>
                    </select>
                </div>
                <div class="form-group"><label>Description</label><textarea name="description" required rows="3"></textarea></div>
                <div class="form-group"><label>Popularity Indicator</label><input type="text" name="popularity_indicator" placeholder="e.g. Iconic Local Dish"></div>
                <div class="form-group"><label>Image URL</label><input type="url" name="image" required></div>
                <button type="submit" class="btn">Add Food Item</button>
            </form>
        </div>

        <h2>Existing Food Items</h2>
        <table class="admin-table">
            <thead>
                <tr><th>ID</th><th>Name</th><th>Category</th><th>Popularity</th><th>Actions</th></tr>
            </thead>
            <tbody>
                <?php if ($result && $result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row['id']; ?></td>
                            <td><strong><?php echo htmlspecialchars($row['name']); ?></strong></td>
                            <td><?php echo htmlspecialchars($row['category']); ?></td>
                            <td><?php echo htmlspecialchars($row['popularity_indicator']); ?></td>
                            <td>
                                <a href="foods_manage.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Delete food item?');" class="btn btn-danger" style="padding: 4px 10px; font-size: 0.8rem;">Delete</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
