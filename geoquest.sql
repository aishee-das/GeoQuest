-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 03, 2024 at 10:57 AM
-- Server version: 5.7.41
-- PHP Version: 8.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scyruk1_durhack`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `forename` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `email`, `username`, `forename`, `surname`, `password`, `is_verified`, `created_at`) VALUES
(4, 'terryhuang15@gmail.com', 'terry', 'huang', 'st', '$2y$10$xVMublf8O5fWEc6tiC4A8u6tx.cRWPmgfx0kXZTKFb7/E.xmNT.Q6', 0, '2024-11-02 20:32:25');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_type` varchar(50) NOT NULL,
  `icon_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quest`
--

CREATE TABLE `quest` (
  `quest_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_type` enum('Food & Drink','Cafe','Landmarks','Social','Outdoors','Nightlife','Shopping','Festivals','Wellbeing','Education') NOT NULL,
  `is_adult_section` tinyint(1) DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `date_added` date DEFAULT NULL,
  `summary` text,
  `location_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `tourist_attraction` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quest_progress`
--

CREATE TABLE `quest_progress` (
  `account_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `total_points` int(11) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT NULL,
  `date_completed` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_type`);

--
-- Indexes for table `quest`
--
ALTER TABLE `quest`
  ADD PRIMARY KEY (`quest_id`);

--
-- Indexes for table `quest_progress`
--
ALTER TABLE `quest_progress`
  ADD PRIMARY KEY (`account_id`,`quest_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `quest`
--
ALTER TABLE `quest`
  MODIFY `quest_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
