<?php
// PHP MySQL Database Configuration (Assignment 12 & 13)
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'explore_nashik';

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    // Graceful error connection page
    die("Database Connection Failed: " . $conn->connect_error . "<br>Please ensure MySQL service is running and explore_nashik.sql is imported.");
}

$conn->set_charset("utf8mb4");
?>
