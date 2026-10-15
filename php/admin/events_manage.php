<?php
// PHP + MySQL CRUD for Culture & Events (Assignment 13)
require_once '../config/db.php';
require_once '../session.php';

requireAdmin();

$msg = '';

if (isset($_GET['delete_id'])) {
    $delete_id = intval($_GET['delete_id']);
    $stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
    $stmt->bind_param("i", $delete_id);
    if ($stmt->execute()) {
        $msg = "Event deleted!";
    }
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $category = trim($_POST['category']);
    $description = trim($_POST['description']);
    $event_date = trim($_POST['event_date']);
    $image = trim($_POST['image']);

    $stmt = $conn->prepare("INSERT INTO events (name, category, description, event_date, image) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $category, $description, $event_date, $image);
    if ($stmt->execute()) {
        $msg = "Cultural event added successfully!";
    }
}

$result = $conn->query("SELECT * FROM events ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Manage Events - PHP CRUD (Assignment 13)</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-navbar">
        <h2>Explore Nashik - Admin CRUD</h2>
        <div>
            <a href="index.php">Dashboard</a>
            <a href="events_manage.php" style="border-bottom: 2px solid white;">Manage Events</a>
            <a href="../logout.php">Logout</a>
        </div>
    </div>

    <div class="admin-body">
        <?php if ($msg): ?><div class="alert alert-success"><?php echo $msg; ?></div><?php endif; ?>

        <h2>Add Cultural Event</h2>
        <div style="background: white; padding: 24px; border-radius: 8px; max-width: 600px; margin-bottom: 30px;">
            <form method="POST" action="events_manage.php">
                <div class="form-group"><label>Event Name</label><input type="text" name="name" required placeholder="e.g. Ram Rath Yatra"></div>
                <div class="form-group"><label>Category</label>
                    <select name="category">
                        <option value="Spiritual">Spiritual</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Festival">Festival</option>
                        <option value="Music & Heritage">Music & Heritage</option>
                    </select>
                </div>
                <div class="form-group"><label>Description</label><textarea name="description" required rows="3"></textarea></div>
                <div class="form-group"><label>Date / Period</label><input type="text" name="event_date" required placeholder="e.g. March / April (Ram Navami)"></div>
                <div class="form-group"><label>Image URL</label><input type="url" name="image" required></div>
                <button type="submit" class="btn">Add Event</button>
            </form>
        </div>

        <h2>Existing Events</h2>
        <table class="admin-table">
            <thead>
                <tr><th>ID</th><th>Name</th><th>Category</th><th>Event Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
                <?php if ($result && $result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row['id']; ?></td>
                            <td><strong><?php echo htmlspecialchars($row['name']); ?></strong></td>
                            <td><?php echo htmlspecialchars($row['category']); ?></td>
                            <td><?php echo htmlspecialchars($row['event_date']); ?></td>
                            <td>
                                <a href="events_manage.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Delete event?');" class="btn btn-danger" style="padding: 4px 10px; font-size: 0.8rem;">Delete</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
