<?php
function getDBConnection() {
    $servername = "localhost";
    $username = "scyruk1_terry";
    $password = "jazzyrain20";
    $dbname = "scyruk1_durhack";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

function displayNavBar() {
    // Check if the user is logged in by verifying if the 'user_id' session variable is set
    if (isset($_SESSION['user_id'])) {
        // User is logged in, display the logged-in navigation bar
        logged_in_nav_bar();
    } else {
        // User is not logged in, display the logged-out navigation bar
        logged_out_nav_bar();
    }
}

function logged_out_nav_bar() {
    echo '
    <nav id="navbar">
        <div class="nav-container">
            <a href="index.php" class="logo">
                <img src="/logo.png" alt="Logo">
            </a>
            <ul class="nav-menu">
                <li><a href="log-in.php">Log In</a></li>
                <li><a href="register.php">Register</a></li>
            </ul>
        </div>
    </nav>';
}

function logged_in_nav_bar() {
    echo '
    <nav id="navbar">
        <div class="nav-container">
            <a href="index.php" class="logo">
                <img src="/logo.png" alt="Logo">
            </a>
            <ul class="nav-menu">
                <li><a href="index.php">Map</a></li>
                <li><a href="quest.php">Quest</a></li>
                <li><a href="log-out-user.php">Log Out</a></li>
            </ul>
        </div>
    </nav>';
}

function displayFooter() {
    echo '
    <footer id="footer">
        <div class="footer-container">
            <p>&copy; ' . date("Y") . ' Krithikha Sivaraj, Terry Huang, Maragarita Boyko, Aishee Das. All rights reserved. <a href="disclaimer.php">Disclaimer</a></p>
        </div>
    </footer>';
}


?>


