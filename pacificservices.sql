-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2025 at 05:49 AM
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
(4, 'aeps003', '3', '255165651323', 'jdjsd', '2025-02-03 18:30:00', 'other', 'debit', 'cut', 'tjsdk', '5254274121', 'dsds', 0, 10, 0, 0, 0, 0, 0, 1000.00, 1000.00, 0.00, 0.00, 80.00, 0.00, 920.00, '2025-02-03 06:25:20'),
(5, '32332', '1', '212122', 'dsd', '2025-02-18 04:44:41', 'aeps_withdrawal', NULL, NULL, 'ds', '2121221222', 'dsq3', 10, 0, 0, 0, 0, 0, 0, 5000.00, 5000.00, 0.00, 0.00, 50.00, 0.00, 0.00, '2025-02-18 04:47:26'),
(6, '44r436', '2', '3232332', 'dsds', '2025-02-18 09:42:50', 'aeps_withdrawal', NULL, NULL, 'dsd', '3323232332', 'ccew', 100, 0, 0, 0, 0, 0, 0, 50000.00, 50000.00, 0.00, 0.00, 400.00, 0.00, 0.00, '2025-02-18 09:43:33');

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

INSERT INTO `commission` (`CommissionID`, `portalId`, `FromAmount`, `ToAmount`, `BankType`, `Amount`, `Percentage`, `PacificType`, `PacificFixedAmount`, `PacificAmount`, `PacificExtraAmount`, `CommissionType`, `CommissionFor`, `VendorID`, `CreatedAt`) VALUES
(3, '1', 1.00, 1020.00, 'no', 0.00, 0.00, NULL, 20.00, 12.00, 8.00, 'Fixed', 'self', 0, '2025-01-03 10:50:13'),
(4, '1', 1016.00, 2030.00, 'no', 0.00, NULL, NULL, 30.00, 24.00, 6.00, 'Fixed', 'self', 0, '2025-01-03 10:51:11'),
(5, '1', 2031.00, 3040.00, 'no', 0.00, NULL, NULL, 40.00, 36.00, 4.00, 'Fixed', 'self', 0, '2025-01-03 10:51:45'),
(6, '2', 1.00, 1020.00, 'no', 0.00, NULL, NULL, 20.00, 5.00, 15.00, 'Fixed', 'self', 0, '2025-01-03 14:48:44'),
(7, '3', 1.00, 1020.00, 'no', 0.00, NULL, NULL, 20.00, 10.00, 10.00, 'Fixed', 'self', 0, '2025-01-05 06:28:11'),
(8, '3', 1021.00, 2040.00, 'no', 20.00, 5.60, NULL, 20.00, 1.12, 18.88, 'Percentage', 'self', 0, '2025-01-06 05:36:51'),
(9, '1', 1.00, 1015.00, 'no', 0.00, NULL, NULL, 15.00, 5.00, 10.00, 'Fixed', 'vendor', 1, '2025-03-03 06:05:37');

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
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `moneytransfer`
--

INSERT INTO `moneytransfer` (`TransferID`, `TransactionNo`, `portalId`, `VendorID`, `ACNo`, `LastName`, `TransactionDate`, `FirstName`, `ContactNo`, `IFSCNo`, `Cash500`, `Cash100`, `Cash50`, `Cash20`, `Cash10`, `Cash5`, `Cash1`, `TotalCash`, `CollectionAmt`, `Discount`, `FixedAmt`, `BankCharge`, `Extra`, `BankDeposit`, `CustDeposit`, `CreatedAt`) VALUES
(1, '124421', '1', 0, '010121121', 'Chavda', '2024-12-31 12:06:15', 'Krupalsinh', '7600230620', 'SBINaroda002', 4, 0, 0, 0, 3, 0, 0, 2030.00, 2030.00, 0.00, 30.00, 24.00, 6.00, 2024.00, 2000.00, '2025-01-03 10:55:44'),
(2, '854721', '1', 0, '7894564125', 'Vaishnani', '2025-01-01 12:06:29', 'Drashti', '9664524393', 'SBINaorda202', 5, 0, 0, 2, 0, 0, 0, 2540.00, 2540.00, 0.00, 40.00, 36.00, 4.00, 2536.00, 2500.00, '2025-01-03 14:25:25'),
(3, NULL, '2', 0, '7878454125', 'Chavda', '2025-01-03 12:06:36', 'Ajitsinh', '9924560775', 'AUNaroda002', 0, 8, 0, 0, 2, 0, 0, 820.00, 820.00, 0.00, 20.00, 5.00, 15.00, 805.00, 800.00, '2025-01-03 15:20:13'),
(4, NULL, '3', 0, '451203010', 'Solanki', '2025-01-04 18:30:00', 'Aasha', '9656324112', 'HDFCkalu231', 0, 5, 0, 0, 2, 0, 0, 520.00, 520.00, 0.00, 20.00, 10.00, 10.00, 510.00, 500.00, '2025-01-05 06:35:05'),
(5, 'testnovendor', '3', 0, '7811521', 'ranavat', '2025-01-06 18:30:00', 'Nandaben', '9645235425', 'sdsdsd', 3, 0, 0, 0, 2, 0, 0, 1520.00, 1520.00, 0.00, 20.00, 1.12, 18.88, 1501.12, 1500.00, '2025-01-06 05:39:29'),
(6, 'jbjbkj221', '1', 0, '551155', 'nnhjhvhh', '2025-01-04 18:30:00', 'hjbhjbj', '4454524454', ' n n', 1, 0, 0, 0, 2, 0, 0, 520.00, 520.00, 0.00, 20.00, 12.00, 8.00, 512.00, 500.00, '2025-01-06 17:06:56'),
(7, '655g4', '1', 0, '555556', 'ghghhg', '2025-02-18 09:40:07', 'ghgh', '6565656565', 'bmm66', 5, 0, 0, 0, 0, 0, 0, 2500.00, 2500.00, 0.00, 40.00, 36.00, 4.00, 2496.00, 2460.00, '2025-02-18 09:41:53'),
(8, 'vendor001', '1', 1, '1010110', 'rathod', '2025-03-03 06:56:03', 'aasha', '7541214121', 'sds50', 1, 0, 0, 0, 1, 1, 0, 515.00, 515.00, 0.00, 15.00, 5.00, 10.00, 505.00, 500.00, '2025-03-03 06:56:47'),
(9, 'eds323', '1', 1, '32323', 'dsd', '2025-03-07 17:05:26', 'dsd', '3232323233', '3ds', 1, 0, 0, 0, 1, 1, 0, 515.00, 515.00, 0.00, 15.00, 5.00, 10.00, 505.00, 500.00, '2025-03-07 17:06:06'),
(10, 'fdfd', '1', 1, '2122', 'laal', '2025-03-07 17:20:54', 'ketan', '4322664475', 'r43f', 1, 0, 0, 0, 1, 1, 0, 515.00, 515.00, 0.00, 15.00, 5.00, 10.00, 505.00, 500.00, '2025-03-07 17:22:10');

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
(1, 'SBI', 'SBI001', '7600230620', 'krupalsinh', NULL, '0001223551', 7647.00, 25200.00, 0, 0.00, '2025-01-02', '2025-01-03 10:49:23'),
(2, 'AU Bank', 'AUBank45', '9998271995', 'Hetal', NULL, '78945641', 53900.00, 25200.00, 0, 0.00, '2025-01-02', '2025-01-03 14:46:27'),
(3, 'HDFC', 'HDFC003', '7600230620', 'Bhagawan', NULL, '1011011010', 3058.88, 25200.00, 0, 0.00, '2025-01-07', '2025-01-05 06:27:36');

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
(13, 3, 1000.00, 920.00, 'Remove Balance', 80.00, '2025-02-03 06:25:43', 'other'),
(14, 1, 6428.00, 340.00, 'Services_Transfer', 6088.00, '2025-02-11 12:12:00', 'Remove Balance'),
(15, 1, 6088.00, 120.00, 'Services_Transfer', 5968.00, '2025-02-12 05:39:18', 'Remove Balance'),
(16, 1, 5968.00, 120.00, 'Services_Transfer', 5848.00, '2025-02-14 14:44:08', 'Remove Balance'),
(17, 1, 5848.00, 1000.00, 'Add Balance', 6848.00, '2025-02-14 09:42:35', NULL),
(18, 1, 6848.00, 5000.00, 'Add Balance', 11848.00, '2025-02-18 04:47:41', 'aeps_withdrawal'),
(19, 3, 80.00, 500.00, 'Add Balance', 580.00, '2025-02-17 23:46:23', NULL),
(20, 1, 11848.00, 120.00, 'Services_Transfer', 11728.00, '2025-02-18 05:16:56', 'Remove Balance'),
(21, 2, 5000.00, 220.00, 'Services_Transfer', 4780.00, '2025-02-18 05:16:56', 'Remove Balance'),
(22, 3, 580.00, 150.00, 'Services_Transfer', 430.00, '2025-02-18 05:16:56', 'Remove Balance'),
(23, 1, 11728.00, 120.00, 'Services_Transfer', 11608.00, '2025-02-18 05:19:53', 'Remove Balance'),
(24, 2, 4780.00, 220.00, 'Services_Transfer', 4560.00, '2025-02-18 05:19:53', 'Remove Balance'),
(25, 3, 430.00, 150.00, 'Services_Transfer', 280.00, '2025-02-18 05:19:53', 'Remove Balance'),
(26, 2, 4560.00, 220.00, 'Services_Transfer', 4340.00, '2025-02-18 05:22:52', 'Remove Balance'),
(27, 2, 4340.00, 220.00, 'Services_Transfer', 4120.00, '2025-02-18 05:27:30', 'Remove Balance'),
(28, 1, 11608.00, 2496.00, 'money_transfer', 9112.00, '2025-02-18 09:42:15', 'Remove Balance'),
(29, 2, 4120.00, 50000.00, 'Add Balance', 54120.00, '2025-02-18 09:45:32', 'aeps_withdrawal'),
(31, 1, 9112.00, 120.00, 'Services_Transfer', 8992.00, '2025-02-22 01:45:15', 'Remove Balance'),
(32, 3, 280.00, 150.00, 'Services_Transfer', 130.00, '2025-02-22 01:58:03', 'Remove Balance'),
(33, 1, 8992.00, 505.00, 'money_transfer', 8487.00, '2025-03-03 12:16:59', 'Remove Balance'),
(34, 3, 130.00, 2500.00, 'Add Balance', 2630.00, '2025-03-03 06:48:22', NULL),
(35, 3, 2630.00, 1501.12, 'money_transfer', 1128.88, '2025-03-03 12:18:49', 'Remove Balance'),
(36, 1, 8687.00, 100.00, 'Add Balance', 8787.00, '2025-03-04 13:31:40', 'balance_from_vendor'),
(37, 3, 1128.88, 100.00, 'Add Balance', 1228.88, '2025-03-04 13:33:57', 'balance_from_vendor'),
(38, 3, 1228.88, 2000.00, 'Add Balance', 3228.88, '2025-03-04 14:09:49', 'balance_from_vendor'),
(39, 2, 54120.00, 220.00, 'Services_Transfer', 53900.00, '2025-03-04 14:59:52', 'Remove Balance'),
(40, 1, 8787.00, 130.00, 'Services_Transfer', 8657.00, '2025-03-07 16:52:12', 'Remove Balance'),
(41, 3, 3228.88, 170.00, 'Services_Transfer', 3058.88, '2025-03-07 16:52:12', 'Remove Balance'),
(42, 1, 8657.00, 505.00, 'money_transfer', 8152.00, '2025-03-07 17:06:12', 'Remove Balance'),
(43, 1, 8152.00, 505.00, 'money_transfer', 7647.00, '2025-03-07 17:30:54', 'Remove Balance');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `paymentType` varchar(255) NOT NULL,
  `services` longtext NOT NULL,
  `subtotal_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `name`, `phone`, `paymentType`, `services`, `subtotal_price`, `total_price`, `created_at`) VALUES
(1, '', NULL, '', '[{\"serviceId\":3,\"price\":300,\"commission_price\":80,\"amount\":220},{\"serviceId\":1,\"price\":150,\"commission_price\":30,\"amount\":120}]', 0.00, 340.00, '2025-02-11 12:12:00'),
(2, '', NULL, '', '[{\"serviceId\":1,\"price\":150,\"commission_price\":30,\"amount\":120}]', 0.00, 120.00, '2025-02-12 05:39:18'),
(3, '', NULL, '', '[{\"serviceId\":1,\"price\":150,\"commission_price\":30,\"amount\":120}]', 0.00, 120.00, '2025-02-14 14:44:08'),
(4, '', NULL, '', '[{\"serviceId\":1,\"portalId\":1,\"price\":150,\"commission_price\":30,\"amount\":120},{\"serviceId\":3,\"portalId\":2,\"price\":300,\"commission_price\":80,\"amount\":220},{\"serviceId\":4,\"portalId\":3,\"price\":200,\"commission_price\":50,\"amount\":150}]', 0.00, 490.00, '2025-02-18 05:19:53'),
(5, '', NULL, '', '[{\"serviceId\":3,\"portalId\":2,\"price\":300,\"commission_price\":80,\"amount\":220}]', 0.00, 220.00, '2025-02-18 05:22:52'),
(6, '', NULL, '', '[{\"serviceId\":3,\"portalId\":2,\"price\":300,\"commission_price\":80,\"amount\":220}]', 0.00, 220.00, '2025-02-18 05:27:30'),
(7, '', NULL, '', '[{\"serviceId\":1,\"portalId\":1,\"description\":\"teet\",\"price\":150,\"commission_price\":30,\"subamount\":150,\"amount\":120}]', 150.00, 120.00, '2025-02-22 01:45:15'),
(8, 'test', '', '', '[{\"serviceId\":4,\"portalId\":3,\"description\":\"test\",\"price\":200,\"commission_price\":50,\"subamount\":200,\"amount\":150}]', 200.00, 150.00, '2025-02-22 01:58:03'),
(9, 'testdiscount', '1010101010', 'Cash', '[{\"serviceId\":3,\"portalId\":2,\"description\":null,\"price\":300,\"discount\":40,\"commission_price\":80,\"subamount\":300,\"amount\":220}]', 260.00, 220.00, '2025-03-04 14:59:52'),
(10, 'ds', '1010201020', 'Cash', '[{\"serviceId\":1,\"portalId\":1,\"description\":\"test\",\"price\":150,\"discount\":10,\"commission_price\":20,\"subamount\":150,\"amount\":130},{\"serviceId\":4,\"portalId\":3,\"description\":\"test\",\"price\":200,\"discount\":20,\"commission_price\":30,\"subamount\":200,\"amount\":170}]', 320.00, 300.00, '2025-03-07 16:52:12');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `portalId` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `commission_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `portalId`, `service_name`, `price`, `commission_price`, `created_at`) VALUES
(1, 1, 'Pan card', 150.00, 30.00, '2025-02-11 07:06:13'),
(3, 2, 'aadhar card', 300.00, 80.00, '2025-02-11 10:56:09'),
(4, 3, 'rasan card', 200.00, 50.00, '2025-02-17 05:05:51');

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

INSERT INTO `vendor` (`id`, `name`, `phone`, `main_balance`, `virtual_balance`, `created_at`) VALUES
(1, 'krupalsinh', '7600230620', 2510.00, 2510.00, '2025-03-03 05:14:22'),
(4, 'Ajitsinh', '9924560775', 16000.00, 14000.00, '2025-03-04 13:53:32');

-- --------------------------------------------------------

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
-- Dumping data for table `vendor_logs`
--

INSERT INTO `vendor_logs` (`id`, `vendor_id`, `before_balance`, `balance`, `type`, `after_balance`, `createdAt`) VALUES
(1, 4, 0.00, 15000.00, 'Add Balance', 15000.00, '2025-03-04 13:53:32'),
(2, 4, 15000.00, 1000.00, 'Add Balance', 16000.00, '2025-03-04 08:32:00'),
(3, 4, 16000.00, 2000.00, 'Remove Virtual Balance', 14000.00, '2025-03-04 08:39:49'),
(4, 1, 5045.00, 1000.00, 'Add Balance', 6045.00, '2025-03-04 08:49:27'),
(5, 1, 3015.00, 505.00, 'Remove Money Transfer', 2510.00, '2025-03-07 17:30:54');

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
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `commission`
--
ALTER TABLE `commission`
  MODIFY `CommissionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `moneytransfer`
--
ALTER TABLE `moneytransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `portals`
--
ALTER TABLE `portals`
  MODIFY `PortalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `portal_logs`
--
ALTER TABLE `portal_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vendor_logs`
--
ALTER TABLE `vendor_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
