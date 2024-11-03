<?php
session_start();
include 'functions.php'; // Include your database connection and functions here

header('Content-Type: application/json'); // Set header for JSON output

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['message' => 'Please log in to add quests.']);
    exit;
}

// Get POST data
$poi_id = $_POST['poi_id'];
$poi_type = $_POST['poi_type'];
$name = $_POST['name'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$category = $_POST['category'];

// Sanitize inputs (recommended)
$poi_id = htmlspecialchars($poi_id, ENT_QUOTES, 'UTF-8');
$poi_type = htmlspecialchars($poi_type, ENT_QUOTES, 'UTF-8');
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$latitude = floatval($latitude);
$longitude = floatval($longitude);
$category = htmlspecialchars($category, ENT_QUOTES, 'UTF-8');

// Database connection
$conn = db_connect(); // Assuming db_connect() is defined in functions.php

// Check if quest already exists
$quest_exists_query = "SELECT * FROM quest WHERE quest_id = ?";
$stmt = $conn->prepare($quest_exists_query);
$stmt->bind_param("s", $poi_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    // Quest does not exist, create a new quest

    // Determine is_adult_section
    $is_adult_section = 0;
    if ($category == 'Nightlife' || stripos($name, 'Bar') !== false) {
        $is_adult_section = 1;
    }

    // Set other fields
    $points = 1; // Hardcoded for now
    $date_added = date('Y-m-d H:i:s');
    $summary = ''; // Empty for now
    $location_url = 'https://www.google.com/search?q=' . urlencode($name);
    $image_path = 'images/quests/' . $poi_id . '.jpg';
    $tourist_attraction = ''; // Empty for now

    // Insert into quest table
    $insert_quest_query = "INSERT INTO quest (quest_id, name, category_type, is_adult_section, longitude, latitude, points, date_added, summary, location_url, image_path, tourist_attraction) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($insert_quest_query);
    $stmt->bind_param("sssiddisssss", $poi_id, $name, $category, $is_adult_section, $longitude, $latitude, $points, $date_added, $summary, $location_url, $image_path, $tourist_attraction);
    $stmt->execute();
}

// Now, check if user already has this quest in quest_progress
$user_id = $_SESSION['user_id'];

$quest_progress_query = "SELECT * FROM quest_progress WHERE account_id = ? AND quest_id = ?";
$stmt = $conn->prepare($quest_progress_query);
$stmt->bind_param("ss", $user_id, $poi_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    // User does not have this quest, add to quest_progress
    $total_points = 1; // Hardcoded for now
    $completed = 0;
    $date_completed = null;

    $insert_quest_progress_query = "INSERT INTO quest_progress (account_id, quest_id, total_points, completed, date_completed) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($insert_quest_progress_query);
    $stmt->bind_param("ssdis", $user_id, $poi_id, $total_points, $completed, $date_completed);
    $stmt->execute();

    echo json_encode(['message' => $name . ' has been added to your quest!']);
} else {
    // User already has this quest
    echo json_encode(['message' => $name . ' is already in your quest.']);
}

// Close database connection
$stmt->close();
$conn->close();
?>
