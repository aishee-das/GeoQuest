<?php
$servername = "localhost";
$username = "scyruk1_terry";
$password = "jazzyrain20";
$dbname = "scyruk1_durhack";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $forename = mysqli_real_escape_string($conn, $_POST['forename']);
    $surname = mysqli_real_escape_string($conn, $_POST['surname']);
    
    // Hash the password (optional but recommended)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert into database
    $sql = "INSERT INTO account (email, username, forename, surname, password, is_verified, created_at) VALUES ('$email', '$username', '$forename', '$surname', '$hashed_password', 0, NOW())";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

// Close connection
mysqli_close($conn);
?>
