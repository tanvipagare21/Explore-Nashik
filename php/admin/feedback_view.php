<?php
// View User Responses & Feedback (Assignment 13 - PHP + MySQL)
require_once '../config/db.php';
require_once '../session.php';

requireAdmin();

$msg = '';

// Handle DELETE
if (isset($_GET['delete_id'])) {
    $delete_id = intval($_GET['delete_id']);
    $stmt = $conn->prepare("DELETE FROM feedback WHERE id = ?");
    $stmt->bind_param("i", $delete_id);
    if ($stmt->execute()) {
        $msg = "Feedback response deleted successfully!";
    }
    $stmt->close();
}

// Fetch all feedback
$result = $conn->query("SELECT * FROM feedback ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Responses & Feedback - Explore Nashik Admin</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-navbar">
        <h2>Explore Nashik Admin</h2>
        <div>
            <a href="index.php">Dashboard</a>
            <a href="places_manage.php">Places</a>
            <a href="foods_manage.php">Food</a>
            <a href="events_manage.php">Events</a>
            <a href="feedback_view.php" style="color: #F6AD55; font-weight: 700;">User Feedback</a>
            <a href="../logout.php" style="color: #FEB2B2;">Logout</a>
        </div>
    </div>

    <div class="admin-body">
        <h1>User Feedback & Discovery Submissions</h1>
        <p>Review real-time feedback and discovery stories submitted by users from the Explore Nashik web app.</p>

        <?php if (!empty($msg)): ?>
            <div class="alert alert-success"><?php echo htmlspecialchars($msg); ?></div>
        <?php endif; ?>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User Name</th>
                    <th>Email Address</th>
                    <th>Favorite Place</th>
                    <th>Rating</th>
                    <th>Feedback / Message</th>
                    <th>Submitted On</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($result && $result->num_rows > 0): ?>
                    <?php while($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row['id']; ?></td>
                            <td><strong><?php echo htmlspecialchars($row['name']); ?></strong></td>
                            <td><a href="mailto:<?php echo htmlspecialchars($row['email']); ?>"><?php echo htmlspecialchars($row['email']); ?></a></td>
                            <td><span class="badge badge-success"><?php echo htmlspecialchars($row['favorite_place']); ?></span></td>
                            <td style="color: #D4A359; font-weight: 700;">
                                <?php echo str_repeat('★', intval($row['rating'])); ?> (<?php echo $row['rating']; ?>/5)
                            </td>
                            <td style="max-width: 320px; line-height: 1.4;"><?php echo nl2br(htmlspecialchars($row['message'])); ?></td>
                            <td style="font-size: 0.85rem; color: #718096;"><?php echo htmlspecialchars($row['submitted_at']); ?></td>
                            <td>
                                <a href="feedback_view.php?delete_id=<?php echo $row['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this response?');">Delete</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="8" style="text-align: center; color: #718096; padding: 24px;">No user feedback submitted yet.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
