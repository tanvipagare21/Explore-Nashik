<?php
// Admin Dashboard (Assignment 13 - PHP + MySQL CRUD)
require_once '../config/db.php';
require_once '../session.php';

requireAdmin();

// Fetch statistics
$places_count = $conn->query("SELECT COUNT(*) as cnt FROM places")->fetch_assoc()['cnt'];
$food_count = $conn->query("SELECT COUNT(*) as cnt FROM food")->fetch_assoc()['cnt'];
$events_count = $conn->query("SELECT COUNT(*) as cnt FROM events")->fetch_assoc()['cnt'];
$feedback_count = $conn->query("SELECT COUNT(*) as cnt FROM feedback")->fetch_assoc()['cnt'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explore Nashik - Admin Dashboard (Assignment 13)</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="admin-navbar">
        <h2>Explore Nashik Admin Dashboard</h2>
        <div>
            <span>Welcome, <strong><?php echo htmlspecialchars($_SESSION['user_name']); ?></strong></span>
            <a href="places_manage.php">Manage Places</a>
            <a href="foods_manage.php">Manage Food</a>
            <a href="events_manage.php">Manage Events</a>
            <a href="../logout.php" style="color: #FEB2B2;">Logout</a>
        </div>
    </div>

    <div class="admin-body">
        <h1>Control Panel Overview</h1>
        <p>Demonstrating PHP + MySQL Database CRUD operations for the Explore Nashik discovery platform.</p>

        <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 24px;">
            <div style="flex: 1; min-width: 200px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 4px solid #1C3D2F;">
                <h3 style="margin: 0; color: #718096; font-size: 0.9rem;">TOTAL PLACES</h3>
                <p style="font-size: 2.2rem; font-weight: 700; margin: 10px 0 0 0; color: #1C3D2F;"><?php echo $places_count; ?></p>
            </div>
            <div style="flex: 1; min-width: 200px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 4px solid #C85A32;">
                <h3 style="margin: 0; color: #718096; font-size: 0.9rem;">TASTE OF NASHIK ITEMS</h3>
                <p style="font-size: 2.2rem; font-weight: 700; margin: 10px 0 0 0; color: #C85A32;"><?php echo $food_count; ?></p>
            </div>
            <div style="flex: 1; min-width: 200px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 4px solid #D4A359;">
                <h3 style="margin: 0; color: #718096; font-size: 0.9rem;">CULTURE & EVENTS</h3>
                <p style="font-size: 2.2rem; font-weight: 700; margin: 10px 0 0 0; color: #D4A359;"><?php echo $events_count; ?></p>
            </div>
            <div style="flex: 1; min-width: 200px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 4px solid #3182CE;">
                <h3 style="margin: 0; color: #718096; font-size: 0.9rem;">USER FEEDBACKS</h3>
                <p style="font-size: 2.2rem; font-weight: 700; margin: 10px 0 0 0; color: #3182CE;"><?php echo $feedback_count; ?></p>
            </div>
        </div>

        <h2 style="margin-top: 40px;">Quick Actions</h2>
        <div style="display: flex; gap: 16px;">
            <a href="places_manage.php?action=add" class="btn">+ Add New Place</a>
            <a href="foods_manage.php?action=add" class="btn" style="background: #C85A32;">+ Add Food Item</a>
            <a href="events_manage.php?action=add" class="btn" style="background: #D4A359; color: #1A202C;">+ Add Cultural Event</a>
        </div>
    </div>
</body>
</html>
