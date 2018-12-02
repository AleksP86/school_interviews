-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2018 at 11:19 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_interviews`
--

-- --------------------------------------------------------

--
-- Table structure for table `apointments`
--

CREATE TABLE `apointments` (
  `id` int(10) UNSIGNED NOT NULL,
  `req_id` varchar(10) NOT NULL,
  `ans_id` varchar(10) DEFAULT NULL,
  `type` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `requested_date` date NOT NULL,
  `requested_time` varchar(30) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `apointments`
--

INSERT INTO `apointments` (`id`, `req_id`, `ans_id`, `type`, `status`, `description`, `requested_date`, `requested_time`, `created_at`, `updated_at`) VALUES
(1, '1', '1', 'Freshman', 'accepted', NULL, '2018-12-02', '9AM - 10AM', '2018-12-01 14:00:00', '2018-12-02 16:42:15'),
(2, '1', '1', 'Transfer', 'accepted', '', '2018-12-04', '11AM - 12AM', '2018-12-01 09:00:00', '2018-12-02 13:35:18'),
(3, '1', '1', 'Transfer', 'refused', 'incomplete documentation.', '2018-11-30', '1PM - 2PM', '2018-12-01 05:00:00', '2018-12-02 13:35:09'),
(4, '1', '1', 'Freshman', 'accepted', '', '2018-12-03', '2PM - 3PM', '2018-12-02 16:38:04', '2018-12-02 16:43:15'),
(21, '1', '1', 'Freshman', 'accepted', '', '2018-12-03', '9AM - 10AM', '2018-12-02 19:52:01', '2018-12-02 21:11:52'),
(24, '1', NULL, 'Freshman', 'pending', '', '2018-12-05', '10AM - 11AM', '2018-12-02 21:12:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `interview`
--

CREATE TABLE `interview` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(20) NOT NULL,
  `active` double NOT NULL DEFAULT '0',
  `description` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `interview`
--

INSERT INTO `interview` (`id`, `type`, `active`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Freshman', 1, 'New student interview.', '2018-12-02 08:16:03', NULL),
(2, 'Transfer', 1, 'New hire interview.', '2018-12-02 08:16:03', '2018-12-02 21:04:53');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2018_11_30_192519_create_users_table', 1),
(2, '2018_12_01_173722_apointments', 2),
(9, '2018_12_02_072827_create_interview_table', 3),
(13, '2018_12_02_091851_user_types', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `active` double NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `password`, `type`, `active`, `created_at`, `updated_at`) VALUES
(1, 'test', 'user', 'admissions@cloudhorizon.com', '4154512', 'admissions', 'student', 1, '2018-11-30 23:00:00', '2018-12-01 21:53:09'),
(3, 'n', 'p', 'em2', '4612', '1234', 'staff', 1, '2018-11-30 23:00:00', '2018-12-01 22:46:13'),
(5, 'a', 'p', 'cd', '41541', '1234', 'student', 1, '2018-12-01 22:52:37', '2018-12-02 21:04:14');

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `active` double NOT NULL DEFAULT '0',
  `description` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `name`, `type`, `active`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Administrator', 1, 'admin', '2018-12-02 11:48:54', NULL),
(2, 'staff', 'Staff', 1, 'osoblje', '2018-12-02 11:48:54', NULL),
(3, 'student', 'Student', 1, 'student', '2018-12-02 11:49:16', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apointments`
--
ALTER TABLE `apointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `interview`
--
ALTER TABLE `interview`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apointments`
--
ALTER TABLE `apointments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `interview`
--
ALTER TABLE `interview`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
