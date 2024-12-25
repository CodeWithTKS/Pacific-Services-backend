-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2024 at 01:41 PM
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
(1, '1', 0.00, 10000.00, 'Savings', 100.00, NULL, 'Standard', 50.00, 20.00, 10.00, 'Fixed', '2024-12-25 12:28:36'),
(2, '2', 10001.00, 50000.00, 'Current', 0.00, 2.50, 'Premium', 0.00, 0.00, 0.00, 'Percentage', '2024-12-25 12:28:36');

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
  `TransactionNo` varchar(50) NOT NULL,
  `portalId` varchar(255) NOT NULL,
  `ACNo` varchar(50) NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `Block` tinyint(1) DEFAULT 0,
  `TransactionType` varchar(50) NOT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `FirstName` varchar(255) NOT NULL,
  `ContactNo` varchar(20) NOT NULL,
  `IFSCNo` varchar(20) DEFAULT NULL,
  `HighlightEntry` tinyint(1) DEFAULT 0,
  `Cash2000` int(11) DEFAULT 0,
  `Cash500` int(11) DEFAULT 0,
  `Cash100` int(11) DEFAULT 0,
  `Cash50` int(11) DEFAULT 0,
  `Cash20` int(11) DEFAULT 0,
  `Cash10` int(11) DEFAULT 0,
  `Cash5` int(11) DEFAULT 0,
  `TotalCash` decimal(15,2) DEFAULT 0.00,
  `CollectionAmt` decimal(15,2) DEFAULT 0.00,
  `SalasarFixedAmt` decimal(15,2) DEFAULT 0.00,
  `BankCharge` decimal(15,2) DEFAULT 0.00,
  `SalasarCharge` decimal(15,2) DEFAULT 0.00,
  `SalasarExtra` decimal(15,2) DEFAULT 0.00,
  `BankDeposit` decimal(15,2) DEFAULT 0.00,
  `CustDeposit` decimal(15,2) DEFAULT 0.00,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `Fax` varchar(50) DEFAULT NULL,
  `ACNo` varchar(50) NOT NULL,
  `Balance` decimal(15,2) DEFAULT 0.00,
  `TransactionLimit` decimal(15,2) DEFAULT 0.00,
  `ServiceTax` tinyint(1) DEFAULT 0,
  `TDSRate` decimal(5,2) DEFAULT 0.00,
  `OpeningBalanceDate` date NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commission`
--
ALTER TABLE `commission`
  MODIFY `CommissionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `moneytransfer`
--
ALTER TABLE `moneytransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portals`
--
ALTER TABLE `portals`
  MODIFY `PortalID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
