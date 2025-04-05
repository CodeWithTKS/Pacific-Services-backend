-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2025 at 05:01 AM
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
-- Database: `pacificservices`
--

-- --------------------------------------------------------

--
-- Table structure for table `aepsmoneytransfer`
--

CREATE TABLE `aepsmoneytransfer` (
  `TransferID` int(11) NOT NULL,
  `TransactionNo` varchar(50) DEFAULT NULL,
  `portalId` varchar(255) NOT NULL,
  `VendorID` int(11) NOT NULL DEFAULT 0,
  `ACNo` varchar(50) NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `TransactionDate` datetime NOT NULL,
  `TransactionType` varchar(255) NOT NULL,
  `OtherType` varchar(255) DEFAULT NULL,
  `OtherName` varchar(255) DEFAULT NULL,
  `passbookIssue` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) NOT NULL,
  `ContactNo` varchar(20) NOT NULL,
  `IFSCNo` varchar(20) DEFAULT NULL,
  `Cash500` int(11) DEFAULT 0,
  `Cash100` int(11) DEFAULT 0,
  `Cash50` int(11) DEFAULT 0,
  `Cash20` int(11) DEFAULT 0,
  `Cash10` int(11) DEFAULT 0,
  `Cash5` int(11) DEFAULT 0,
  `Cash1` int(11) DEFAULT 0,
  `TotalCash` decimal(15,2) DEFAULT 0.00,
  `CollectionAmt` decimal(15,2) DEFAULT 0.00,
  `FixedAmt` decimal(15,2) DEFAULT 0.00,
  `BankCharge` decimal(15,2) DEFAULT 0.00,
  `Extra` decimal(15,2) DEFAULT 0.00,
  `BankDeposit` decimal(15,2) DEFAULT 0.00,
  `CustDeposit` decimal(15,2) DEFAULT 0.00,
  `AOB` decimal(10,2) NOT NULL DEFAULT 0.00,
  `PendingAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `ReceivedAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `HighlightEntry` tinyint(1) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aepsmoneytransfer`
--

-- --------------------------------------------------------

--
-- Table structure for table `cashback`
--

CREATE TABLE `cashback` (
  `id` int(11) NOT NULL,
  `portalId` int(11) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cashback`
--

-- --------------------------------------------------------

--
-- Table structure for table `commission`
--

CREATE TABLE `commission` (
  `CommissionID` int(11) NOT NULL,
  `portalId` varchar(255) NOT NULL,
  `FromAmount` decimal(15,2) NOT NULL,
  `ToAmount` decimal(15,2) NOT NULL,
  `BankType` varchar(50) DEFAULT NULL,
  `Amount` decimal(15,2) NOT NULL,
  `Percentage` decimal(5,2) DEFAULT NULL,
  `PacificType` varchar(50) DEFAULT NULL,
  `PacificFixedAmount` decimal(15,2) DEFAULT 0.00,
  `PacificAmount` decimal(15,2) DEFAULT 0.00,
  `PacificExtraAmount` decimal(15,2) DEFAULT 0.00,
  `CommissionType` varchar(50) NOT NULL,
  `CommissionFor` enum('self','vendor') NOT NULL DEFAULT 'self',
  `VendorID` int(11) NOT NULL DEFAULT 0,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commission`
--

-- --------------------------------------------------------

--
-- Table structure for table `fundtransfer`
--

CREATE TABLE `fundtransfer` (
  `TransferID` int(11) NOT NULL,
  `TransactionNo` varchar(50) DEFAULT NULL,
  `portalId` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `TransactionDate` datetime NOT NULL,
  `ContactNo` varchar(20) NOT NULL,
  `IFSCNo` varchar(20) DEFAULT NULL,
  `customerUID` varchar(50) NOT NULL,
  `beneficiaryUID` varchar(50) NOT NULL,
  `TransactionType` varchar(50) NOT NULL,
  `TransactionCategory` enum('Credit','Debit') NOT NULL,
  `Cash500` int(11) DEFAULT 0,
  `Cash100` int(11) DEFAULT 0,
  `Cash50` int(11) DEFAULT 0,
  `Cash20` int(11) DEFAULT 0,
  `Cash10` int(11) DEFAULT 0,
  `Cash5` int(11) DEFAULT 0,
  `Cash1` int(11) DEFAULT 0,
  `TotalCash` decimal(15,2) DEFAULT 0.00,
  `CollectionAmt` decimal(15,2) DEFAULT 0.00,
  `Extra` decimal(15,2) DEFAULT 0.00,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `HighlightEntry` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fundtransfer`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','User','Manager') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `subscription_status` enum('Active','Expired','Pending') NOT NULL DEFAULT 'Pending',
  `subscription_expiry` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_id`, `email`, `password`, `role`, `created_at`, `updated_at`, `subscription_status`, `subscription_expiry`) VALUES
(1, 'user@example.com', '$2a$10$oyQMqq06ACQjgDsxriA1MuHb2QYDu2OXDs9I3jH7jZqEIaD4nGd3G', 'Admin', '2024-10-27 07:48:07', '2025-04-04 17:33:37', 'Active', '2025-04-06');

-- --------------------------------------------------------

--
-- Table structure for table `mobiletransfer`
--

CREATE TABLE `mobiletransfer` (
  `TransferID` int(11) NOT NULL,
  `TransactionNo` varchar(50) DEFAULT NULL,
  `portalId` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `TransactionDate` datetime NOT NULL,
  `ContactNo` varchar(20) NOT NULL,
  `TransferType` varchar(50) NOT NULL,
  `TransactionType` varchar(50) NOT NULL,
  `TransactionCategory` enum('Credit','Debit') NOT NULL,
  `Cash500` int(11) DEFAULT 0,
  `Cash100` int(11) DEFAULT 0,
  `Cash50` int(11) DEFAULT 0,
  `Cash20` int(11) DEFAULT 0,
  `Cash10` int(11) DEFAULT 0,
  `Cash5` int(11) DEFAULT 0,
  `Cash1` int(11) DEFAULT 0,
  `TotalCash` decimal(15,2) DEFAULT 0.00,
  `CollectionAmt` decimal(15,2) DEFAULT 0.00,
  `Extra` decimal(15,2) DEFAULT 0.00,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `HighlightEntry` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mobiletransfer`
--

-- --------------------------------------------------------

--
-- Table structure for table `moneytransfer`
--

CREATE TABLE `moneytransfer` (
  `TransferID` int(11) NOT NULL,
  `TransactionNo` varchar(50) DEFAULT NULL,
  `portalId` varchar(255) NOT NULL,
  `VendorID` int(11) DEFAULT 0,
  `ACNo` varchar(50) NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `TransactionDate` datetime NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `ContactNo` varchar(20) NOT NULL,
  `IFSCNo` varchar(20) DEFAULT NULL,
  `Cash500` int(11) DEFAULT 0,
  `Cash100` int(11) DEFAULT 0,
  `Cash50` int(11) DEFAULT 0,
  `Cash20` int(11) DEFAULT 0,
  `Cash10` int(11) DEFAULT 0,
  `Cash5` int(11) DEFAULT 0,
  `Cash1` int(11) DEFAULT 0,
  `TotalCash` decimal(15,2) DEFAULT 0.00,
  `CollectionAmt` decimal(15,2) DEFAULT 0.00,
  `Discount` decimal(10,2) DEFAULT 0.00,
  `FixedAmt` decimal(15,2) DEFAULT 0.00,
  `BankCharge` decimal(15,2) DEFAULT 0.00,
  `Extra` decimal(15,2) DEFAULT 0.00,
  `BankDeposit` decimal(15,2) DEFAULT 0.00,
  `CustDeposit` decimal(15,2) DEFAULT 0.00,
  `comments` varchar(255) DEFAULT NULL,
  `self` tinyint(1) DEFAULT 0,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `HighlightEntry` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `moneytransfer`
--

-- --------------------------------------------------------

--
-- Table structure for table `pancardsales`
--

CREATE TABLE `pancardsales` (
  `id` int(11) NOT NULL,
  `VendorID` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `UID` varchar(50) DEFAULT NULL,
  `paymentType` varchar(100) NOT NULL,
  `TransferType` varchar(50) DEFAULT NULL,
  `portalId` int(11) DEFAULT NULL,
  `services` longtext NOT NULL,
  `total_price` decimal(10,2) NOT NULL CHECK (`total_price` >= 0),
  `comments` varchar(255) DEFAULT NULL,
  `workStatus` varchar(50) DEFAULT 'pending',
  `HighlightEntry` tinyint(1) NOT NULL DEFAULT 0,
  `PendingAmount` decimal(10,2) NOT NULL DEFAULT 0.00 CHECK (`PendingAmount` >= 0),
  `ReceivedAmount` decimal(10,2) NOT NULL CHECK (`ReceivedAmount` >= 0),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pancardsales`
--

-- --------------------------------------------------------

--
-- Table structure for table `portals`
--

CREATE TABLE `portals` (
  `PortalID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Code` varchar(50) NOT NULL,
  `ContactNo` varchar(20) NOT NULL,
  `ContactPerson` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `ACNo` varchar(50) NOT NULL,
  `Balance` decimal(15,2) DEFAULT 0.00,
  `TransactionLimit` decimal(15,2) DEFAULT 0.00,
  `ServiceTax` tinyint(1) DEFAULT 0,
  `TDSRate` decimal(5,2) DEFAULT 0.00,
  `OpeningBalanceDate` date NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portals`
--

-- --------------------------------------------------------

--
-- Table structure for table `portal_logs`
--

CREATE TABLE `portal_logs` (
  `id` int(11) NOT NULL,
  `portal_id` int(11) NOT NULL,
  `before_balance` decimal(15,2) NOT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `after_balance` decimal(15,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `transactionType` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portal_logs`
--

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `UID` varchar(50) DEFAULT NULL,
  `paymentType` varchar(255) NOT NULL,
  `TransferType` varchar(50) DEFAULT NULL,
  `portalId` int(11) DEFAULT NULL,
  `services` longtext NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `comments` varchar(50) DEFAULT NULL,
  `workStatus` varchar(50) DEFAULT NULL,
  `HighlightEntry` tinyint(1) NOT NULL,
  `PendingAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `ReceivedAmount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `portalId` int(11) DEFAULT 0,
  `service_name` varchar(255) NOT NULL,
  `purchase_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `role` enum('Admin','User','Manager') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `main_balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `virtual_balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor`
--

--------------------------------------------------------

--
-- Table structure for table `vendor_logs`
--

CREATE TABLE `vendor_logs` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `before_balance` decimal(15,2) NOT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `after_balance` decimal(15,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aepsmoneytransfer`
--
ALTER TABLE `aepsmoneytransfer`
  ADD PRIMARY KEY (`TransferID`);

--
-- Indexes for table `cashback`
--
ALTER TABLE `cashback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commission`
--
ALTER TABLE `commission`
  ADD PRIMARY KEY (`CommissionID`);

--
-- Indexes for table `fundtransfer`
--
ALTER TABLE `fundtransfer`
  ADD PRIMARY KEY (`TransferID`),
  ADD UNIQUE KEY `TransactionNo` (`TransactionNo`),
  ADD KEY `portalId` (`portalId`),
  ADD KEY `beneficiaryUID` (`beneficiaryUID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `mobiletransfer`
--
ALTER TABLE `mobiletransfer`
  ADD PRIMARY KEY (`TransferID`);

--
-- Indexes for table `moneytransfer`
--
ALTER TABLE `moneytransfer`
  ADD PRIMARY KEY (`TransferID`);

--
-- Indexes for table `pancardsales`
--
ALTER TABLE `pancardsales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portals`
--
ALTER TABLE `portals`
  ADD PRIMARY KEY (`PortalID`);

--
-- Indexes for table `portal_logs`
--
ALTER TABLE `portal_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portalId` (`userId`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_logs`
--
ALTER TABLE `vendor_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aepsmoneytransfer`
--
ALTER TABLE `aepsmoneytransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `cashback`
--
ALTER TABLE `cashback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `commission`
--
ALTER TABLE `commission`
  MODIFY `CommissionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `fundtransfer`
--
ALTER TABLE `fundtransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mobiletransfer`
--
ALTER TABLE `mobiletransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `moneytransfer`
--
ALTER TABLE `moneytransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `pancardsales`
--
ALTER TABLE `pancardsales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `portals`
--
ALTER TABLE `portals`
  MODIFY `PortalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `portal_logs`
--
ALTER TABLE `portal_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `vendor_logs`
--
ALTER TABLE `vendor_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `login` (`login_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
