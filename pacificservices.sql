-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2025 at 02:25 PM
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

INSERT INTO `aepsmoneytransfer` (`TransferID`, `TransactionNo`, `portalId`, `VendorID`, `ACNo`, `LastName`, `TransactionDate`, `TransactionType`, `OtherType`, `OtherName`, `passbookIssue`, `FirstName`, `ContactNo`, `IFSCNo`, `Cash500`, `Cash100`, `Cash50`, `Cash20`, `Cash10`, `Cash5`, `Cash1`, `TotalCash`, `CollectionAmt`, `FixedAmt`, `BankCharge`, `Extra`, `BankDeposit`, `CustDeposit`, `AOB`, `PendingAmount`, `ReceivedAmount`, `HighlightEntry`, `CreatedAt`) VALUES
(11, 'aeps_withdrawal01', '1', 0, '20202020', 'chavda', '2025-03-29 05:27:33', 'aeps_withdrawal', NULL, NULL, '', 'krupalsinh', '7600230620', 'dd00', 1, 0, 0, 1, 0, 0, 0, 520.00, 520.00, 0.00, 0.00, 20.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, '2025-03-29 05:28:18'),
(12, 'cif/ac/wid', '1', 0, '101010', 'test', '2025-03-29 05:30:50', 'cif_ac_wid', NULL, NULL, '', 'test', '7474747474', '747474', 0, 3, 0, 0, 1, 1, 0, 315.00, 315.00, 0.00, 0.00, 15.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, '2025-03-29 05:31:25'),
(13, 'accopen', '1', 0, '3232323', 'dsd', '2025-03-29 05:33:23', 'account_opening', NULL, NULL, 'Pending', 'ddsd', '3232323233', '333', 0, 2, 0, 0, 0, 0, 0, 200.00, 200.00, 0.00, 0.00, 99.00, 0.00, 0.00, 101.00, 50.00, 150.00, 1, '2025-03-29 05:34:05'),
(14, 'atm dipo', '1', 0, '323233', 'fdf', '2025-03-29 05:34:37', 'atm_ac_dip', NULL, NULL, '', 'fdfd', '3434343444', 'fd4', 1, 0, 0, 1, 0, 0, 0, 520.00, 520.00, 0.00, 0.00, 20.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1, '2025-03-29 05:35:16'),
(15, 'aob', '2', 0, '741741741', 'vhhvh', '2025-03-29 06:10:04', 'account_opening', NULL, NULL, 'Pending', 'hjhvj', '7474747474', '100', 0, 3, 0, 0, 0, 0, 0, 300.00, 300.00, 0.00, 0.00, 99.00, 0.00, 0.00, 201.00, 200.00, 100.00, 1, '2025-03-29 06:11:08');

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

INSERT INTO `cashback` (`id`, `portalId`, `balance`, `remark`, `date`, `type`) VALUES
(7, 1, 11.00, 'test cashback', '2025-03-29 10:54:53', 'Cash'),
(8, 2, 100.00, 'testcash', '2025-03-29 11:37:10', 'Cash');

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
(9, '1', 1.00, 1015.00, 'no', 0.00, NULL, NULL, 15.00, 5.00, 10.00, 'Fixed', 'vendor', 1, '2025-03-03 06:05:37'),
(12, '3', 1.00, 100000.00, 'no', 0.00, 0.30, NULL, 0.00, 0.00, 0.00, 'Percentage', 'vendor', 4, '2025-03-12 06:42:12'),
(13, '1', 1.00, 10000.00, 'no', 0.00, 0.30, NULL, 0.00, 0.00, 0.00, 'Percentage', 'vendor', 4, '2025-03-12 12:24:07'),
(14, '4', 1.00, 1015.00, 'no', 0.00, NULL, NULL, 15.00, 0.00, 15.00, 'Fixed', 'self', 0, '2025-03-27 08:37:37'),
(15, '4', 1016.00, 2030.00, 'no', 0.00, NULL, NULL, 30.00, 0.00, 30.00, 'Fixed', 'self', 0, '2025-03-27 08:37:54'),
(16, '4', 2031.00, 3040.00, 'no', 0.00, NULL, NULL, 40.00, 0.00, 40.00, 'Fixed', 'self', 0, '2025-03-27 08:38:19'),
(17, '4', 3041.00, 4050.00, 'no', 0.00, NULL, NULL, 50.00, 0.00, 50.00, 'Fixed', 'self', 0, '2025-03-27 08:39:16'),
(18, '4', 4051.00, 5060.00, 'no', 0.00, NULL, NULL, 60.00, 0.00, 60.00, 'Fixed', 'self', 0, '2025-03-27 08:39:38'),
(19, '4', 5061.00, 6075.00, 'no', 0.00, NULL, NULL, 75.00, 0.00, 75.00, 'Fixed', 'self', 0, '2025-03-27 08:40:06');

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

INSERT INTO `fundtransfer` (`TransferID`, `TransactionNo`, `portalId`, `FirstName`, `LastName`, `TransactionDate`, `ContactNo`, `IFSCNo`, `customerUID`, `beneficiaryUID`, `TransactionType`, `TransactionCategory`, `Cash500`, `Cash100`, `Cash50`, `Cash20`, `Cash10`, `Cash5`, `Cash1`, `TotalCash`, `CollectionAmt`, `Extra`, `CreatedAt`, `HighlightEntry`) VALUES
(1, 'benitest', '1', 'krupalsinh', '', '2025-03-29 06:46:18', '7600230620', 'dsd', '414141', '5', 'AEPS', 'Credit', 2, 0, 0, 1, 0, 0, 0, 1020.00, 1020.00, 20.00, '2025-03-29 12:16:59', 0);

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
(1, 'user@example.com', '$2a$10$oyQMqq06ACQjgDsxriA1MuHb2QYDu2OXDs9I3jH7jZqEIaD4nGd3G', 'Admin', '2024-10-27 07:48:07', '2024-10-27 07:48:07', 'Pending', NULL);

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

INSERT INTO `mobiletransfer` (`TransferID`, `TransactionNo`, `portalId`, `FirstName`, `LastName`, `TransactionDate`, `ContactNo`, `TransferType`, `TransactionType`, `TransactionCategory`, `Cash500`, `Cash100`, `Cash50`, `Cash20`, `Cash10`, `Cash5`, `Cash1`, `TotalCash`, `CollectionAmt`, `Extra`, `CreatedAt`, `HighlightEntry`) VALUES
(2, 'google credit', '1', 'krupalsinh', '', '2025-03-29 05:36:24', '7600230620', 'Google Pay', 'MobileNo', 'Credit', 10, 0, 0, 0, 0, 0, 0, 5000.00, 5000.00, 0.00, '2025-03-29 05:37:05', 0),
(3, 'googlecash', '2', 'hgghhggh', '', '2025-03-29 06:11:50', '7600230620', 'Google Pay', 'QR', 'Credit', 1, 0, 0, 1, 0, 0, 0, 520.00, 520.00, 20.00, '2025-03-29 06:12:11', 0);

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

INSERT INTO `moneytransfer` (`TransferID`, `TransactionNo`, `portalId`, `VendorID`, `ACNo`, `LastName`, `TransactionDate`, `FirstName`, `ContactNo`, `IFSCNo`, `Cash500`, `Cash100`, `Cash50`, `Cash20`, `Cash10`, `Cash5`, `Cash1`, `TotalCash`, `CollectionAmt`, `Discount`, `FixedAmt`, `BankCharge`, `Extra`, `BankDeposit`, `CustDeposit`, `comments`, `self`, `CreatedAt`, `HighlightEntry`) VALUES
(16, 'test money', '1', 0, '10210', 'chavda', '2025-03-29 05:26:17', 'Krupalsinh', '7600230620', '230500', 2, 0, 0, 0, 0, 0, 0, 1000.00, 1000.00, 0.00, 20.00, 12.00, 8.00, 992.00, 980.00, 'test monay', 0, '2025-03-29 05:26:52', 0),
(17, 'tesrr200', '2', 0, '202220', 'est', '2025-03-29 06:07:27', 'testr', '7600230620', '2120', 1, 0, 0, 1, 0, 0, 0, 520.00, 520.00, 0.00, 20.00, 5.00, 15.00, 505.00, 500.00, '', 0, '2025-03-29 06:08:54', 1);

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
(1, 'SBI', 'SBI001', '7600230620', 'krupalsinh', NULL, '0001223551', 15077.00, 25200.00, 0, 0.00, '2025-01-02', '2025-01-03 10:49:23'),
(2, 'AU Bank', 'AUBank45', '9998271995', 'Hetal', NULL, '78945641', 53794.00, 25200.00, 0, 0.00, '2025-01-02', '2025-01-03 14:46:27'),
(3, 'HDFC', 'HDFC003', '7600230620', 'Bhagawan', NULL, '1011011010', 3061.00, 25200.00, 0, 0.00, '2025-01-07', '2025-01-05 06:27:36'),
(4, 'SBI LAX', 'SBI', '8778788787', 'LAXM', NULL, '', 47000.00, 20240.00, 0, 0.00, '2025-03-28', '2025-03-27 08:37:11'),
(5, 'beneficery', 'beni', '7600230620', 'krupal', NULL, '', 11000.00, 0.00, 0, 0.00, '2025-03-30', '2025-03-29 12:45:34');

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
(63, 1, 10859.00, 11.00, 'Cashback', 10870.00, '2025-03-29 05:24:53', 'Add Balance'),
(64, 1, 10870.00, 992.00, 'money_transfer', 9878.00, '2025-03-29 05:27:01', 'Remove Balance'),
(65, 1, 9878.00, 500.00, 'aeps_withdrawal', 10378.00, '2025-03-29 05:28:39', 'Add Balance'),
(66, 1, 10378.00, 300.00, 'cif_ac_wid', 10678.00, '2025-03-29 05:31:41', 'Add Balance'),
(67, 1, 10678.00, 101.00, 'account_opening', 10577.00, '2025-03-29 05:34:17', 'Remove Balance'),
(68, 1, 10577.00, 500.00, 'atm_ac_dip', 10077.00, '2025-03-29 05:35:31', 'Remove Balance'),
(69, 1, 10077.00, 5000.00, 'mobile transfer', 15077.00, '2025-03-29 05:37:15', 'Add Balance'),
(70, 2, 53900.00, 100.00, 'Cashback', 54000.00, '2025-03-29 06:07:10', 'Add Balance'),
(71, 2, 54000.00, 505.00, 'money_transfer', 53495.00, '2025-03-29 06:09:04', 'Remove Balance'),
(72, 2, 53495.00, 201.00, 'account_opening', 53294.00, '2025-03-29 06:11:15', 'Remove Balance'),
(73, 2, 53294.00, 500.00, 'mobile transfer', 53794.00, '2025-03-29 06:12:20', 'Add Balance'),
(74, 5, 0.00, 10000.00, 'Add Balance', 10000.00, '2025-03-29 12:45:34', NULL),
(75, 5, 10000.00, 1000.00, 'fund transfer', 11000.00, '2025-03-29 12:53:17', 'Add Balance');

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
(4, 3, 'rasan card', 200.00, 50.00, '2025-02-17 05:05:51'),
(5, 1, 'test', 150.00, 43.00, '2025-03-17 04:52:04');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `portalId` int(11) NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `role` enum('Admin','User','Manager') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(4, 'Ajitsinh', '9924560775', 11000.00, 11000.00, '2025-03-04 13:53:32');

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
  ADD KEY `portalId` (`portalId`);

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
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `cashback`
--
ALTER TABLE `cashback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `commission`
--
ALTER TABLE `commission`
  MODIFY `CommissionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `fundtransfer`
--
ALTER TABLE `fundtransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mobiletransfer`
--
ALTER TABLE `mobiletransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `moneytransfer`
--
ALTER TABLE `moneytransfer`
  MODIFY `TransferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `portals`
--
ALTER TABLE `portals`
  MODIFY `PortalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `portal_logs`
--
ALTER TABLE `portal_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vendor_logs`
--
ALTER TABLE `vendor_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`portalId`) REFERENCES `login` (`login_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
