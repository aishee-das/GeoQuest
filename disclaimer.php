<?php

    // We need to use sessions, so you should always start sessions using the below code.
    session_start();

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    // Include functions and connect to the database using PDO MySQL
    include "functions.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Log In</title>

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

</head>
<body>
<?php displayNavBar(); ?>

<div class="disclaimer" style="margin-left: 10%; margin-right: 10%;">
    <h2>Disclaimer</h2>
    <p>GeoQuest is a project created during the weekend of the 2nd-3rd of November 2024 at DurHack, an annual hackathon hosted by Durham University. This project was developed by Aishee Das, Krithikha Sivaraj, Margarita Boyko, and Terry Huang, who are fourth-year Computer Science students at the University of Edinburgh.</p>

    <p>GeoQuest Adventure Map is a concept for a gamified travel experience. Users can explore various locations, complete "quests," and earn virtual badges and rewards by engaging in local activities like trying unique foods, visiting iconic landmarks, or meeting locals. This platform aims to make travel more interactive and engaging through gamification.</p>

    <p><strong>Please note:</strong> GeoQuest is a prototype created as part of a hackathon competition and is not a real, fully functional service. It was developed over a short time frame and is intended for demonstration purposes only. GeoQuest is not affiliated with any official travel or tourism organisation, and the features presented are conceptual.</p>

    <p>For more information on the team, feel free to connect with us on LinkedIn:</p>
    <ul>
        <li><a href="https://www.linkedin.com/in/aishee-das-25719b220/" target="_blank">Aishee Das</a></li>
        <li><a href="https://www.linkedin.com/in/t3rryhuang/" target="_blank">Terry Huang</a></li>
        <li><a href="https://www.linkedin.com/in/krithikhasivaraj/" target="_blank">Krithikha Sivaraj</a></li>
        <li><a href="https://www.linkedin.com/in/margarita-boyko-325151262/" target="_blank">Margarita Boyko</a></li>
    </ul>
</div>

<?php
    // Display the footer
    displayFooter();
    ?>
</body>
</html>
