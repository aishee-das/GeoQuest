<?php
$servername = "localhost";
$username = "scyruk1_terry";
$password = "jazzyrain20";
$dbname = "scyruk1_durhack";

// Create connection using mysqli_connect
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "Connected successfully!";
}

// Close connection
mysqli_close($conn);
?>
