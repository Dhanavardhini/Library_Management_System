-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2025 at 09:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `published_year` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `book_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `book_name`, `author_name`, `published_year`, `description`, `book_image`) VALUES
(1, 'jhvjas', 'kvhas', 13244, 'yafscdvj', 'uploads/pexels-shvetsa-3786158 (1).jpg'),
(2, 'appu', 'th', 68, 'dc', 'uploads\\images (1).jfif'),
(5, 'etyr', 'ryt', 52, 'yt', 'uploads\\img 7.jpg'),
(6, 'harry', '34', 87, 'tgfh', 'uploads\\img 1.jpg'),
(7, 'dhana', 'gf', 56, 'gh', 'uploads/bird 1.jpg'),
(8, 'bcn', 'jb', 875, '6ui', 'uploads\\cloud.jpg'),
(9, 'programming in php', 'karthik anand babu', 2024, 'programming language, sever side scripting language', 'uploads/pexels-todd-trapani-488382-1420440 (1).jpg'),
(10, 'programming in java', 'sharmila', 2022, 'programming language', 'uploads/pexels-shvetsa-3786158.jpg'),
(11, 'programming in python', 'sharmila', 2022, 'programming language', 'uploads/pexels-shvetsa-3786158.jpg'),
(12, 'Siva1', 'aakf', 198471, 'uidq', 'uploads\\img 12.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `borrowed_books`
--

CREATE TABLE `borrowed_books` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `payment_method` varchar(30) NOT NULL,
  `time_in` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','returned') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowed_books`
--

INSERT INTO `borrowed_books` (`id`, `username`, `email`, `book_name`, `author_name`, `payment_method`, `time_in`, `status`) VALUES
(1, 'muruga63', 'admin@gmail.com', 'jhvjas', 'kvhas', 'Credit Card', '2025-04-14 13:08:45', 'returned'),
(2, 'siva', 'sri@gmail.com', 'etyr', 'ryt', 'Credit Card', '2025-04-14 13:09:11', 'returned');

-- --------------------------------------------------------

--
-- Table structure for table `returned_books`
--

CREATE TABLE `returned_books` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `date_borrowed` datetime NOT NULL,
  `time_out` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('Returned','Pending') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `returned_books`
--

INSERT INTO `returned_books` (`id`, `username`, `email`, `book_name`, `author_name`, `date_borrowed`, `time_out`, `status`) VALUES
(1, 'muruga63', 'admin@gmail.com', 'jhvjas', 'kvhas', '2025-04-14 13:08:45', '2025-04-14 13:08:45', 'Returned'),
(2, 'siva', 'sri@gmail.com', 'etyr', 'ryt', '2025-04-14 13:09:11', '2025-04-14 13:09:11', 'Returned');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'vky', 'admin@gmail.com', 'admin123', '2025-03-29 15:37:53'),
(10, 'vky', 'admin@gmai1123.com', 'admin123', '2025-03-31 15:29:46'),
(12, 'gana', 'admin@gm.com', 'admin123', '2025-04-02 02:15:34'),
(13, 'dhana', 'dhana@gmail.com', '12345', '2025-04-03 11:36:35'),
(14, 'dhana', 'dhanam@gmail.com', '12345', '2025-04-03 11:37:18'),
(15, 'siva', 'sri@gmail.com', '12345', '2025-04-06 06:56:16'),
(16, 'appu', 'appu@gmail.com', '12345', '2025-04-06 07:35:00'),
(17, 'ammu', 'ammu@gmail.com', 'ammu', '2025-04-06 09:37:15'),
(18, 'swathini', 'swathini@gmail.com', 'swa34', '2025-04-07 03:21:47'),
(19, 'nisha', 'nisha@gmail.com', 'nisha', '2025-04-07 05:55:04'),
(20, 'kannika', 'kannika@gmail.com', 'kani', '2025-04-07 07:09:33'),
(21, 'Sivaammu', 'Sivaammu@gmail.com', '121345', '2025-04-14 07:03:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrowed_books`
--
ALTER TABLE `borrowed_books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `returned_books`
--
ALTER TABLE `returned_books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `borrowed_books`
--
ALTER TABLE `borrowed_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `returned_books`
--
ALTER TABLE `returned_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
