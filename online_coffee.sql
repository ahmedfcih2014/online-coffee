-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 12, 2021 at 05:29 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_coffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `coffee_reservations`
--

CREATE TABLE `coffee_reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `number_of_cups` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `coffee_reservations_cups`
--

CREATE TABLE `coffee_reservations_cups` (
  `id` int(11) NOT NULL,
  `coffee_reservation_id` int(11) NOT NULL,
  `cup_size_id` int(11) NOT NULL,
  `cup_size_price` double NOT NULL DEFAULT 0,
  `cup_flavor_id` int(11) NOT NULL,
  `cup_flavor_price` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cup_flavors`
--

CREATE TABLE `cup_flavors` (
  `id` int(11) NOT NULL,
  `flavor_name` varchar(255) NOT NULL,
  `extra_price` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cup_sizes`
--

CREATE TABLE `cup_sizes` (
  `id` int(11) NOT NULL,
  `size_name` varchar(255) NOT NULL,
  `extra_price` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','blocked') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coffee_reservations`
--
ALTER TABLE `coffee_reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coffee_reservations_cups`
--
ALTER TABLE `coffee_reservations_cups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cup_flavors`
--
ALTER TABLE `cup_flavors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cup_sizes`
--
ALTER TABLE `cup_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `admins` ADD UNIQUE `username_unique` (`username`);
--
-- AUTO_INCREMENT for table `coffee_reservations`
--
ALTER TABLE `coffee_reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coffee_reservations_cups`
--
ALTER TABLE `coffee_reservations_cups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cup_flavors`
--
ALTER TABLE `cup_flavors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cup_sizes`
--
ALTER TABLE `cup_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `coffee_reservations` ADD `comment` VARCHAR(255) NULL DEFAULT NULL AFTER `number_of_cups`;

ALTER TABLE `online_coffee`.`users` ADD UNIQUE `unique_phone` (`phone`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
