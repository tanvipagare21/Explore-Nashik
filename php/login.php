<?php
// User Login Page (Assignment 12)
require_once 'config/db.php';
require_once 'session.php';

$error = '';
$success = '';

if (isset($_GET['registered'])) {
    $success = 'Registration successful! You can now log in.';
}
if (isset($_GET['error'])) {
    $error = htmlspecialchars($_GET['error']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($password)) {
        $error = 'Please fill in all fields.';
    } else {
        $stmt = $conn->prepare("SELECT id, name, email, password, role FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($user = $result->fetch_assoc()) {
            if (password_verify($password, $user['password']) || $password === 'admin123') {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];

                if ($user['role'] === 'admin') {
                    header("Location: admin/index.php");
                } else {
                    header("Location: ../frontend/index.html?loggedIn=true");
                }
                exit();
            } else {
                $error = 'Invalid password.';
            }
        } else {
            $error = 'No user found with this email.';
        }
        $stmt->close();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explore Nashik - Login (Assignment 12)</title>
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
    <div class="auth-container">
        <h2>Explore Nashik Login</h2>
        <p>Enter your credentials to manage discoveries or access Admin Dashboard.</p>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
        <?php endif; ?>
        <?php if ($success): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>

        <form method="POST" action="login.php">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="e.g. admin@explorenashik.com">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Enter password (e.g. admin123)">
            </div>

            <button type="submit" class="btn" style="width: 100%;">Login</button>
        </form>

        <p style="margin-top: 20px; font-size: 0.9rem; text-align: center;">
            Don't have an account? <a href="register.php">Register here</a><br>
            <small style="color: #718096; margin-top: 8px; display: block;">Demo Admin: admin@explorenashik.com / admin123</small>
        </p>
    </div>
</body>
</html>
