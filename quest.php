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
    <title>My Quests</title>
    <meta charset="UTF-8">
    <!-- Include Custom CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Replace 'Open Sans' with your desired font -->
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="quest-page">
    <?php displayNavBar(); ?>

    <div id="quest-header">
        <h2>My Quests</h2>
    </div>

    <!-- Progress Bar and Level Display -->
    <div id="progress-container">
        <span id="current-level">Level 1</span>
        <div id="progress-bar-container">
            <div id="progress-bar"></div>
        </div>
    </div>

    <!-- Quest Header Section -->
    <div id="quest-header">


        <!-- Category Filter Dropdown -->
        <div id="filter-buttons">
            <button onclick="filterQuests('All')">All</button>
            <button onclick="filterQuests('restaurant')">Food & Drink</button>
            <button onclick="filterQuests('Cafe')">Cafe</button>
            <button onclick="filterQuests('landmark')">Landmarks</button>
            <button onclick="filterQuests('Social')">Social</button>
            <button onclick="filterQuests('Outdoors')">Outdoors</button>
            <button onclick="filterQuests('Nightlife')">Nightlife</button>
            <button onclick="filterQuests('shopping')">Shopping</button>
            <button onclick="filterQuests('Festivals')">Festivals</button>
            <button onclick="filterQuests('wellbeing')">Wellbeing</button>
            <button onclick="filterQuests('Education')">Education</button>
        </div>
    </div>

    

    <!-- Quest List -->
    <div id="quest-list">
        <ul id="quests">
            <!-- Quests will be dynamically inserted here -->
        </ul>
    </div>


    <!-- Include Custom JS -->
    <script src="quest.js"></script>

    <?php
    // Display the footer
    displayFooter();
    ?>
</body>
</html>
