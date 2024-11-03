<?php
session_start();

// Database credentials
$servername = "localhost";
$db_username = "scyruk1_terry";
$db_password = "jazzyrain20";
$dbname = "scyruk1_durhack";

// Create connection
$conn = mysqli_connect($servername, $db_username, $db_password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data and escape special characters
    $email_or_username = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    // Query to check if the user exists by either email or username
    $sql = "SELECT * FROM account WHERE email = '$email_or_username' OR username = '$email_or_username'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        // Fetch user data
        $user = mysqli_fetch_assoc($result);
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['account_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['forename'] = $user['forename'];
            $_SESSION['surname'] = $user['surname'];
            
            // Redirect to index.php
            header("Location: index.php");
            exit();
        } else {
            // Incorrect password
            echo "Incorrect password.";
        }
    } else {
        // User not found
        echo "No account found with that email or username.";
    }
}

// Close connection
mysqli_close($conn);
?>
