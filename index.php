<?php

    // We need to use sessions, so you should always start sessions using the below code.
    session_start();

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    // Include functions and connect to the database using PDO MySQL
    include "functions.php";
?>

<!DOCTYPE html>
<html>
<head>
    <title>GeoQuest Adventure Map</title>
    <meta charset="UTF-8">
    <!-- Include Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <!-- Include Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Replace 'Open Sans' with your desired font -->
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <!-- Include Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    
    <!-- Navigation Bar -->
    <?php displayNavBar(); ?>

    <!-- Sidebar -->
    <div id="sidebar">
        <div class="sidebar-section">
            <button id="location-btn">➤ Use Current Location</button>
        </div>
        <div class="sidebar-section">
            <input type="text" id="postcode" placeholder="Enter Location">
            <button id="search-btn">Set Region</button>
        </div>
        <div class="sidebar-section">
            <h3>Filter by Categories</h3>
            <div class="category-buttons">
                <button class="category-btn" data-category="restaurant">Restaurants</button>
                <button class="category-btn" data-category="landmark">Landmarks</button>
                <button class="category-btn" data-category="nightlife">Nightlife</button>
                <button class="category-btn" data-category="outdoor">Outdoor</button>
                <!-- Add more categories as needed -->
            </div>
        </div>
        <div class="sidebar-section">
            <h3>Filter by Distance</h3>
            <input type="range" id="distance-slider" min="500" max="5000" step="500" value="1000">
            <span id="distance-value">1000m</span>
        </div>
        <div class="sidebar-section">
            <button id="show-quests-btn">Show Me the Quests</button>
        </div>
    </div>

    <!-- Map Container -->
    <div id="map"></div>

    <!-- Include Leaflet JS -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <!-- Include Custom JS -->
    <script src="script.js"></script>

    <?php
    // Display the footer
    displayFooter();
    ?>
</body>
</html>
