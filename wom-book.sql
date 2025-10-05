-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2025 at 12:54 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wom-book`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `sku` varchar(64) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(200) DEFAULT NULL,
  `publisher` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(12,2) NOT NULL CHECK (`price` >= 0),
  `stock` int(11) NOT NULL DEFAULT 0 CHECK (`stock` >= 0),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `version` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `sku`, `title`, `author`, `publisher`, `description`, `price`, `stock`, `is_active`, `version`, `created_at`, `updated_at`) VALUES
('41f7604c-3a36-47e3-a537-b765e206c584', 'BOOK-FS4-2025', 'Muhammad Alfatih', 'Felix Siauw', 'Yuk Ngaji', 'Religi novel about a young leader.', '300000.00', 0, 0, 0, '2025-10-04 02:59:03', '2025-10-04 02:59:03'),
('48fe0721-18a5-42b0-a580-80c284c033cc', 'BOOK-FA1-2025', 'Tragedi Gunung Gede', 'Fajar Aditya', 'RJL5', 'Cerita tragedi 5 orang di Gunung Gede', '150000.00', 3, 1, 0, '2025-10-05 00:50:21', '2025-10-05 10:34:27'),
('763ff4a3-42a0-446b-a8ce-d4f7d430567d', 'BOOK-RD3-2025', 'Atomic Habits', 'Raditya Dika', 'Bloomsbury', 'Fantasy novel about a young wizard, the first book in the Harry Potter series.', '200000.00', 4, 1, 0, '2025-10-04 02:55:56', '2025-10-04 14:56:44'),
('89375938-f650-4490-a2bb-75bca636331a', 'BOOK-RD2-2025', 'Koala Kumal', 'Raditya Dika', 'Bloomsbury', 'Fantasy novel about a young wizard, the first book in the Harry Potter series.', '100000.00', 4, 1, 0, '2025-10-04 02:55:14', '2025-10-04 15:06:45'),
('9bd2bd6e-eb8e-418b-a819-d3dffb57465e', 'BOOK-HP1-2025', 'Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 'Bloomsbury', 'Fantasy novel about a young wizard, the first book in the Harry Potter series.', '150000.00', 50, 1, 0, '2025-10-04 02:53:27', '2025-10-04 02:53:27'),
('d48896bf-cffc-4556-89e4-a46112bbaa39', 'BOOK-FA2-2025', 'Hilang dalam dekapan Semeru', 'Fajar Aditya', 'RJL5', 'Cerita tragedi 7 orang di Gunung Semeru', '180000.00', 19, 0, 0, '2025-10-05 00:51:30', '2025-10-05 01:14:31'),
('e2077b2c-c34c-44b5-84e7-9d9255163a5f', 'BOOK-NA2-2025', 'Sistem Informasi Akademik dengan Laravel', 'Nurik Akbar', 'Ilmu Website', 'Pengembangan SIAK dengan Laravel', '80000.00', 22, 1, 0, '2025-10-05 01:17:42', '2025-10-05 01:17:42'),
('eaadec11-57e1-498a-8c3d-31db53798f7c', 'BOOK-FS3-2025', 'Habits', 'Felix Siauw', 'Yuk Ngaji', 'Fantasy novel about a young wizard, the first book in the Harry Potter series.', '200000.00', 0, 0, 0, '2025-10-04 02:57:33', '2025-10-04 03:28:36');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `email` varchar(320) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `email`, `created_at`, `updated_at`) VALUES
('3535c722-2e5b-41ff-b964-670cf6625d18', 'lola@yahoo.com', '2025-10-04 11:12:59', '2025-10-04 11:12:59'),
('e967e30b-904e-4a9f-8d5b-e8ccb250af12', 'perdi_27email@gmail.com', '2025-10-04 08:48:17', '2025-10-04 08:48:17');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `cart_id` char(36) NOT NULL,
  `book_id` char(36) NOT NULL,
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `error_logs`
--

CREATE TABLE `error_logs` (
  `id` int(11) NOT NULL,
  `route` varchar(255) DEFAULT NULL,
  `method` varchar(10) DEFAULT NULL,
  `context` text NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload`)),
  `message` text NOT NULL,
  `stack_trace` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `error_logs`
--

INSERT INTO `error_logs` (`id`, `route`, `method`, `context`, `payload`, `message`, `stack_trace`, `created_at`) VALUES
(1, '/user', 'POST', 'API User-postUser', '\"{\\\"email\\\":\\\"endo@gmail.com\\\",\\\"roleId\\\":1,\\\"name\\\":\\\"Endo\\\",\\\"password\\\":\\\"Password2025\\\"}\"', 'notNull Violation: User.email cannot be null', 'SequelizeValidationError: notNull Violation: User.email cannot be null\n    at InstanceValidator._validate (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:50:13)\n    at async InstanceValidator._validateAndRunHooks (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:60:7)\n    at async InstanceValidator.validate (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:54:12)\n    at async model.save (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\model.js:2426:7)\n    at async User.create (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\model.js:1362:12)\n    at async postUser (C:\\perdianto\\project\\wom-book-service\\src\\controller\\UserController.js:25:5)', '2025-10-05 05:11:03'),
(2, '/user', 'POST', 'API User-postUser', '\"{\\\"email\\\":\\\"endo@gmail.com\\\",\\\"roleId\\\":1,\\\"name\\\":\\\"Endo\\\",\\\"password\\\":\\\"Password2025\\\"}\"', 'notNull Violation: User.email cannot be null', 'SequelizeValidationError: notNull Violation: User.email cannot be null\n    at InstanceValidator._validate (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:50:13)\n    at async InstanceValidator._validateAndRunHooks (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:60:7)\n    at async InstanceValidator.validate (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:54:12)\n    at async model.save (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\model.js:2426:7)\n    at async User.create (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\model.js:1362:12)\n    at async postUser (C:\\perdianto\\project\\wom-book-service\\src\\controller\\UserController.js:25:5)', '2025-10-05 05:15:02'),
(3, '/user', 'POST', 'API User-postUser', '\"{\\\"email\\\":\\\"endo@gmail.com\\\",\\\"roleId\\\":1,\\\"name\\\":\\\"Endo\\\",\\\"password\\\":\\\"Password2025\\\"}\"', 'notNull Violation: User.email cannot be null', 'SequelizeValidationError: notNull Violation: User.email cannot be null\n    at InstanceValidator._validate (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:50:13)\n    at async InstanceValidator._validateAndRunHooks (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:60:7)\n    at async InstanceValidator.validate (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:54:12)\n    at async model.save (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\model.js:2426:7)\n    at async User.create (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\model.js:1362:12)\n    at async postUser (C:\\perdianto\\project\\wom-book-service\\src\\controller\\UserController.js:25:5)', '2025-10-05 05:16:20'),
(4, '/user', 'POST', 'API User-postUser', '\"{\\\"email\\\":\\\"endo@gmail.com\\\",\\\"roleId\\\":1,\\\"name\\\":\\\"Endo\\\",\\\"password\\\":\\\"Password2025\\\"}\"', 'notNull Violation: User.email cannot be null', 'SequelizeValidationError: notNull Violation: User.email cannot be null\n    at InstanceValidator._validate (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:50:13)\n    at async InstanceValidator._validateAndRunHooks (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:60:7)\n    at async InstanceValidator.validate (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\instance-validator.js:54:12)\n    at async model.save (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\model.js:2426:7)\n    at async User.create (C:\\perdianto\\project\\wom-book-service\\node_modules\\sequelize\\lib\\model.js:1362:12)\n    at async postUser (C:\\perdianto\\project\\wom-book-service\\src\\controller\\UserController.js:25:5)', '2025-10-05 05:49:56');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `email` varchar(320) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `total_amount` decimal(14,2) NOT NULL CHECK (`total_amount` >= 0),
  `status` enum('pending','paid','failed','cancelled') NOT NULL,
  `payment_channel` varchar(100) DEFAULT NULL,
  `payment_reference` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `email`, `order_number`, `total_amount`, `status`, `payment_channel`, `payment_reference`, `created_at`, `updated_at`) VALUES
('7985a39a-a6ad-45f0-8111-f73665b39a5e', 'perdi_27email@gmail.com', 'ORD-1759590405249', '300000.00', 'paid', 'bca_va', 'VA9876543210', '2025-10-04 15:06:45', '2025-10-04 16:01:49'),
('d8467590-0976-47df-a26b-048b27b6a423', 'lola@yahoo.com', 'ORD-1759589804043', '1500000.00', 'paid', 'linkaja', 'INV-1759594309694', '2025-10-04 14:56:44', '2025-10-04 16:12:39'),
('fcb6a9cf-5c0b-47ae-9e13-0af26ec102a9', 'perdi_27email@gmail.com', 'ORD-1759660467130', '750000.00', 'paid', 'gopay', 'INV-1759660783749', '2025-10-05 10:34:27', '2025-10-05 10:43:18');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `order_id` char(36) NOT NULL,
  `book_id` char(36) NOT NULL,
  `unit_price` decimal(12,2) NOT NULL CHECK (`unit_price` >= 0),
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `subtotal` decimal(14,2) NOT NULL CHECK (`subtotal` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `book_id`, `unit_price`, `quantity`, `subtotal`) VALUES
('2ac68093-35f9-4065-83fd-63f3243988dc', '7985a39a-a6ad-45f0-8111-f73665b39a5e', '89375938-f650-4490-a2bb-75bca636331a', '100000.00', 3, '300000.00'),
('58c24613-a018-45af-9a78-db6a012f1903', 'd8467590-0976-47df-a26b-048b27b6a423', '763ff4a3-42a0-446b-a8ce-d4f7d430567d', '200000.00', 6, '1200000.00'),
('b4ffb53e-7470-4583-a760-6407bbdeca37', 'fcb6a9cf-5c0b-47ae-9e13-0af26ec102a9', '48fe0721-18a5-42b0-a580-80c284c033cc', '150000.00', 5, '750000.00'),
('e1d6ef08-50bd-4b91-a315-8989813cf1a0', 'd8467590-0976-47df-a26b-048b27b6a423', '89375938-f650-4490-a2bb-75bca636331a', '100000.00', 3, '300000.00');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'customer', 'Role untuk pelanggan / pengguna aplikasi', '2025-10-03 09:53:14', '2025-10-03 09:53:14'),
(2, 'admin', 'Role untuk administrator yang mengelola sistem', '2025-10-03 09:53:14', '2025-10-03 09:53:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(200) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `role_id`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'perdi_27email@gmail.com', '$2b$10$Z/Ea6ZITfeNj5XMxLmtvkeuB8Z7SuCN1SrnM/vO0h49T2N./j6P3K', 'Perdi', 1, 1, '2025-10-03 10:16:52', '2025-10-03 10:20:44'),
(2, 'ade@yahoo.com', '$2b$10$FY4LoPwL9yG7.caHwjCmC.2K.ReDTCfLMv40kdSBQUy16GHTnQIuC', 'Ade Jaenudin', 2, 1, '2025-10-03 10:20:31', '2025-10-03 10:20:31'),
(3, 'lola@yahoo.com', '$2b$10$TOh5qI.FnGJ0ngss/r9Gue5T3.dtV8NjMhiI5NXtez.ZiSBpdXjRC', 'Lola Setiawati', 1, 1, '2025-10-03 11:47:32', '2025-10-03 11:47:32'),
(4, 'maryam@yahoo.com', '$2b$10$Gk5SlwU/hzpdngjgRRMtyOtu58qyZ4pNA8QEpgn.A1BUMQigiGUem', 'Maryam Mariani', 2, 1, '2025-10-04 02:25:36', '2025-10-04 02:25:36'),
(5, 'arif@gmail.com', '$2b$10$m2rqFbNxyif4njydbY39XuOVCo8z2CQWCm6sJa/bwTfQvZ3okwUBW', 'Arif', 2, 1, '2025-10-04 02:33:03', '2025-10-04 02:33:03'),
(6, 'eni@gmail.com', '$2b$10$omehDjIMZCGuoCoyZ9FMqOodDQXja6VFHUQ5coaXAXt/.0RmHwNmu', 'Eni', 2, 1, '2025-10-05 05:08:11', '2025-10-05 05:57:34'),
(7, 'endo@gmail.com', '$2b$10$CVO/U8/cAhdxOhha6dw0D.rE5JeK1Jb0eOqL40kMnyfMiIIceFz8K', 'Endo', 1, 1, '2025-10-05 05:57:14', '2025-10-05 05:57:14');

-- --------------------------------------------------------

--
-- Table structure for table `user_sessions`
--

CREATE TABLE `user_sessions` (
  `id` int(11) NOT NULL,
  `email` varchar(320) NOT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `device_info` varchar(255) DEFAULT NULL,
  `token` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`id`, `email`, `ip_address`, `device_info`, `token`, `created_at`) VALUES
(31, 'arif@gmail.com', '::1', 'PostmanRuntime/7.48.0', 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaWZAZ21haWwuY29tIiwicm9sZUlkIjoyLCJpYXQiOjE3NTk1Njc1OTgsImV4cCI6MTc1OTU3MTE5OH0.FOi0XGMaHuIf0npWjV4GajsHieARV5z4R30h424v1D47SZj3aNg_VSSFYKv_HgoR_6mKYj4kcq0EufkTNrX42Q', '2025-10-04 08:46:38'),
(39, 'lola@yahoo.com', '::1', 'PostmanRuntime/7.48.0', 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvbGFAeWFob28uY29tIiwicm9sZUlkIjoxLCJpYXQiOjE3NTk1OTQzMDIsImV4cCI6MTc1OTU5NzkwMn0.7jvOyAhYxIOzhei2SvROOdE7m0aIyGsAjMShBgS9-ud3dyF6Ms2mySpV1TAetgy5LMHCR2Hf79yXG6GlVwDE0A', '2025-10-04 16:11:42'),
(49, 'perdi_27email@gmail.com', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcmRpXzI3ZW1haWxAZ21haWwuY29tIiwicm9sZUlkIjoxLCJpYXQiOjE3NTk2NjA5NDIsImV4cCI6MTc1OTY2NDU0Mn0.bdZd96u6rZ3Qo2QtbLuPFOmLOOhHQfimMgHrWIHS3h5Lnx-1epeojS2uctMApfh_tt86b8IYMimXQTwQ5JuQ0A', '2025-10-05 10:42:22'),
(50, 'ade@yahoo.com', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZUB5YWhvby5jb20iLCJyb2xlSWQiOjIsImlhdCI6MTc1OTY2MTA3OSwiZXhwIjoxNzU5NjY0Njc5fQ.Ea8y2a4qzSJZ1r9xhcLMD4cDNS3PjGp24MumKTNnsN2qmsBZoUSDnsHiOiRFwo-4RanCPQNTOSNZzQkhhGp1fA', '2025-10-05 10:44:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_carts_user` (`email`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_cart_book` (`cart_id`,`book_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `error_logs`
--
ALTER TABLE `error_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `error_logs`
--
ALTER TABLE `error_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
