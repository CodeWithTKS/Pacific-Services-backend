-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2025 at 01:23 PM
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
  `ACNo` varchar(50) NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `TransactionDate` datetime NOT NULL,
  `TransactionType` varchar(255) NOT NULL,
  `OtherType` varchar(255) DEFAULT NULL,
  `OtherName` varchar(255) DEFAULT NULL,
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
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aepsmoneytransfer`
--

INSERT INTO `aepsmoneytransfer` (`TransferID`, `TransactionNo`, `portalId`, `ACNo`, `LastName`, `TransactionDate`, `TransactionType`, `OtherType`, `OtherName`, `FirstName`, `ContactNo`, `IFSCNo`, `Cash500`, `Cash100`, `Cash50`, `Cash20`, `Cash10`, `Cash5`, `Cash1`, `TotalCash`, `CollectionAmt`, `FixedAmt`, `BankCharge`, `Extra`, `BankDeposit`, `CustDeposit`, `CreatedAt`) VALUES
(1, 'aeps001', '1', '1201', 'Chavda', '2025-02-02 18:30:00', 'aeps_withdrawal', NULL, NULL, 'Krupalsinh', '7600230620', 'dsdsd', 2, 0, 0, 0, 0, 0, 0, 1000.00, 1000.00, 20.00, 12.00, 8.00, 992.00, 980.00, '2025-02-02 12:26:59'),
(3, 'aeps002', '1', '451265842', 'kumar', '2025-02-02 18:30:00', 'other', 'debit', 'kuch bhi', 'Hero', '9815146345', 'dsdsd3', 0, 5, 0, 0, 0, 0, 0, 500.00, 500.00, 0.00, 0.00, 20.00, 0.00, 480.00, '2025-02-03 05:36:50'),
(4, 'aeps003', '3', '255165651323', 'jdjsd', '2025-02-03 18:30:00', 'other', 'debit', 'cut', 'tjsdk', '5254274121', 'dsds', 0, 10, 0, 0, 0, 0, 0, 1000.00, 1000.00, 0.00, 0.00, 80.00, 0.00, 920.00, '2025-02-03 06:25:20');

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
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commission`
--

INSERT INTO `commission` (`CommissionID`, `portalId`, `FromAmount`, `ToAmount`, `BankType`, `Amount`, `Percentage`, `PacificType`, `PacificFixedAmount`, `PacificAmount`, `PacificExtraAmount`, `CommissionType`, `CreatedAt`) VALUES
(3, '1', 1.00, 1020.00, 'no', 0.00, 0.00, NULL, 20.00, 12.00, 8.00, 'Fixed', '2025-01-03 10:50:13'),
(4, '1', 1016.00, 2030.00, 'no', 0.00, NULL, NULL, 30.00, 24.00, 6.00, 'Fixed', '2025-01-03 10:51:11'),
(5, '1', 2031.00, 3040.00, 'no', 0.00, NULL, NULL, 40.00, 36.00, 4.00, 'Fixed', '2025-01-03 10:51:45'),
(6, '2', 1.00, 1020.00, 'no', 0.00, NULL, NULL, 20.00, 5.00, 15.00, 'Fixed', '2025-01-03 14:48:44'),
(7, '3', 1.00, 1020.00, 'no', 0.00, NULL, NULL, 20.00, 10.00, 10.00, 'Fixed', '2025-01-05 06:28:11'),
(8, '3', 1021.00, 2040.00, 'no', 20.00, 5.60, NULL, 20.00, 1.12, 18.88, 'Percentage', '2025-01-06 05:36:51');

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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_id`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'user@example.com', '$2a$10$oyQMqq06ACQjgDsxriA1MuHb2QYDu2OXDs9I3jH7jZqEIaD4nGd3G', 'Admin', '2024-10-27 07:48:07', '2024-10-27 07:48:07');

-- --------------------------------------------------------

--
-- Table structure for table `moneytransfer`
--

CREATE TABLE `moneytransfer` (
  `TransferID` int(11) NOT NULL,
  `TransactionNo` varchar(50) DEFAULT NULL,
  `portalId` varchar(255) NOT NULL,
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
  `FixedAmt` decimal(15,2) DEFAULT 0.00,
  `BankCharge` decimal(15,2) DEFAULT 0.00,
  `Extra` decimal(15,2) DEFAULT 0.00,
  `BankDeposit` decimal(15,2) DEFAULT 0.00,
  `CustDeposit` decimal(15,2) DEFAULT 0.00,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `moneytransfer`
--

INSERT INTO `moneytransfer` (`TransferID`, `TransactionNo`, `portalId`, `ACNo`, `LastName`, `TransactionDate`, `FirstName`, `ContactNo`, `IFSCNo`, `Cash500`, `Cash100`, `Cash50`, `Cash20`, `Cash10`, `Cash5`, `Cash1`, `TotalCash`, `CollectionAmt`, `FixedAmt`, `BankCharge`, `Extra`, `BankDeposit`, `CustDeposit`, `CreatedAt`) VALUES
(1, '124421', '1', '010121121', 'Chavda', '2024-12-31 12:06:15', 'Krupalsinh', '7600230620', 'SBINaroda002', 4, 0, 0, 0, 3, 0, 0, 2030.00, 2030.00, 30.00, 24.00, 6.00, 2024.00, 2000.00, '2025-01-03 10:55:44'),
(2, '854721', '1', '7894564125', 'Vaishnani', '2025-01-01 12:06:29', 'Drashti', '9664524393', 'SBINaorda202', 5, 0, 0, 2, 0, 0, 0, 2540.00, 2540.00, 40.00, 36.00, 4.00, 2536.00, 2500.00, '2025-01-03 14:25:25'),
(3, NULL, '2', '7878454125', 'Chavda', '2025-01-03 12:06:36', 'Ajitsinh', '9924560775', 'AUNaroda002', 0, 8, 0, 0, 2, 0, 0, 820.00, 820.00, 20.00, 5.00, 15.00, 805.00, 800.00, '2025-01-03 15:20:13'),
(4, NULL, '3', '451203010', 'Solanki', '2025-01-04 18:30:00', 'Aasha', '9656324112', 'HDFCkalu231', 0, 5, 0, 0, 2, 0, 0, 520.00, 520.00, 20.00, 10.00, 10.00, 510.00, 500.00, '2025-01-05 06:35:05'),
(5, NULL, '3', '7811521', 'ranavat', '2025-01-06 18:30:00', 'Nandaben', '9645235425', 'sdsdsd', 3, 0, 0, 0, 2, 0, 0, 1520.00, 1520.00, 20.00, 1.12, 18.88, 1501.12, 1500.00, '2025-01-06 05:39:29'),
(6, 'jbjbkj221', '1', '551155', 'nnhjhvhh', '2025-01-04 18:30:00', 'hjbhjbj', '4454524454', ' n n', 1, 0, 0, 0, 2, 0, 0, 520.00, 520.00, 20.00, 12.00, 8.00, 512.00, 500.00, '2025-01-06 17:06:56');

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

INSERT INTO `portals` (`PortalID`, `Name`, `Code`, `ContactNo`, `ContactPerson`, `Email`, `ACNo`, `Balance`, `TransactionLimit`, `ServiceTax`, `TDSRate`, `OpeningBalanceDate`, `CreatedAt`) VALUES
(1, 'SBI', 'SBI001', '7600230620', 'krupalsinh', NULL, '0001223551', 6428.00, 25200.00, 0, 0.00, '2025-01-02', '2025-01-03 10:49:23'),
(2, 'AU Bank', 'AUBank45', '9998271995', 'Hetal', NULL, '78945641', 5000.00, 25200.00, 0, 0.00, '2025-01-03', '2025-01-03 14:46:27'),
(3, 'HDFC', 'HDFC003', '7600230620', 'Bhagawan', NULL, '1011011010', 80.00, 25200.00, 0, 0.00, '2025-01-02', '2025-01-05 06:27:36');

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

INSERT INTO `portal_logs` (`id`, `portal_id`, `before_balance`, `balance`, `type`, `after_balance`, `createdAt`, `transactionType`) VALUES
(1, 1, 0.00, 10000.00, 'Add Balance', 10000.00, '2025-01-03 10:49:23', 'money_transfer'),
(2, 1, 10000.00, 500.00, 'Add Balance', 10500.00, '2025-01-03 13:35:56', 'money_transfer'),
(3, 1, 10000.00, 2024.00, 'Remove Balance', 8476.00, '2025-01-03 14:19:23', 'money_transfer'),
(4, 1, 8476.00, 2536.00, 'Remove Balance', 5940.00, '2025-01-03 14:25:56', 'money_transfer'),
(5, 2, 0.00, 5000.00, 'Add Balance', 5000.00, '2025-01-03 14:46:27', 'money_transfer'),
(6, 3, 0.00, 1000.00, 'Add Balance', 1000.00, '2025-01-05 06:27:36', 'money_transfer'),
(7, 1, 5940.00, 0.00, 'Add Balance', 5940.00, '2025-01-06 00:05:56', 'money_transfer'),
(8, 1, 5940.00, 0.00, 'Add Balance', 5940.00, '2025-01-06 11:32:10', 'money_transfer'),
(9, 1, 5940.00, 500.00, 'Add Balance', 6440.00, '2025-01-06 11:32:31', 'money_transfer'),
(10, 1, 6440.00, 512.00, 'Remove Balance', 5928.00, '2025-01-06 17:08:25', 'money_transfer'),
(11, 1, 5928.00, 980.00, 'Add Balance', 6908.00, '2025-02-03 03:08:20', 'aeps_withdrawal'),
(12, 1, 6908.00, 480.00, 'Remove Balance', 6428.00, '2025-02-03 05:36:59', 'other'),
(13, 3, 1000.00, 920.00, 'Remove Balance', 80.00, '2025-02-03 06:25:43', 'other');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aepsmoneytransfer`
--
ALTER TABLE `aepsmoneytransfer`
  ADD PRIMARY KEY (`TransferID`);

--
-- Indexes for table `commission`
--
ALTER TABLE `commission`
  ADD PRIMARY KEY (`CommissionID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `moneytransfer`
--
ALTER TABLE `moneytransfer`
  ADD PRIMARY KEY (`TransferID`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aepsmoneytransfer`
--
ALTER TABLE `aepsmoneytransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `commission`
--
ALTER TABLE `commission`
  MODIFY `CommissionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `moneytransfer`
--
ALTER TABLE `moneytransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `portals`
--
ALTER TABLE `portals`
  MODIFY `PortalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `portal_logs`
--
ALTER TABLE `portal_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
