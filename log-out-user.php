<?php
session_start(); // Start the session

// Destroy the session
session_unset(); // Unset all session variables
session_destroy(); // Destroy the session

// Redirect to log-in.php
header("Location: log-in.php");
exit();
?>
