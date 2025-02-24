<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>

    <meta charset="UTF-8">
    <!-- Include Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Replace 'Open Sans' with your desired font -->
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <!-- Include Custom CSS -->
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="account.css">

    <style>body {
        background-image: url("images/register-background.jpg");
        background-size: cover; /* Ensures the image covers the entire background */
        background-repeat: no-repeat; /* Prevents the image from repeating */
        background-attachment: fixed; /* Keeps the background fixed while scrolling */
        background-position: center; /* Centers the background image */
    }</style>
</head>
<body>
    <?php
        include 'functions.php';
        logged_out_nav_bar();
    ?>
    <form action="register-user.php" method="post">
    <h2>Register</h2>
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>

        <label for="username">Username:</label><br>
        <input type="username" id="username" name="username" required><br><br>

        <label for="forename">First Name:</label><br>
        <input type="forename" id="forename" name="forename" required><br><br>

        <label for="surname">Surname:</label><br>
        <input type="surname" id="surname" name="surname" required><br><br>
        
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br><br>
        
        <input type="submit" value="Register">
    </form>

    <?php
    // Display the footer
    displayFooter();
    ?>
</body>
</html>
