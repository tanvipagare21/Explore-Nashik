<?php
// User Registration Page (Assignment 12)
require_once 'config/db.php';
require_once 'session.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($name) || empty($email) || empty($password)) {
        $error = 'All fields are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Invalid email address format.';
    } elseif (strlen($password) < 6) {
        $error = 'Password must be at least 6 characters.';
    } else {
        // Check if email already exists
        $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        if ($checkStmt->get_result()->num_rows > 0) {
            $error = 'An account with this email already exists.';
        } else {
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);
            $role = 'user';

            $insertStmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
            $insertStmt->bind_param("ssss", $name, $email, $hashed_password, $role);

            if ($insertStmt->execute()) {
                header("Location: login.php?registered=1");
                exit();
            } else {
                $error = 'Failed to create account. Please try again.';
            }
            $insertStmt->close();
        }
        $checkStmt->close();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explore Nashik - Register (Assignment 12)</title>
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
    <div class="auth-container">
        <h2>Register Account</h2>
        <p>Join Explore Nashik to save discoveries and interact with the platform.</p>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
        <?php endif; ?>

        <form method="POST" action="register.php">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required placeholder="e.g. Tanvi Pagare">
            </div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="e.g. tanvi@example.com">
            </div>

            <div class="form-group">
                <label for="password">Password (min 6 chars)</label>
                <input type="password" id="password" name="password" required minlength="6">
            </div>

            <button type="submit" class="btn" style="width: 100%;">Create Account</button>
        </form>

        <p style="margin-top: 20px; font-size: 0.9rem; text-align: center;">
            Already have an account? <a href="login.php">Login here</a>
        </p>
    </div>
</body>
</html>
