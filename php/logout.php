<?php
// User Logout Script (Assignment 12)
require_once 'session.php';

session_unset();
session_destroy();

header("Location: login.php?message=Logged+out+successfully");
exit();
?>
