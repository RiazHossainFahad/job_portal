-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2019 at 08:02 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jp`
--

-- --------------------------------------------------------

--
-- Table structure for table `applied_jobs`
--

CREATE TABLE `applied_jobs` (
  `a_id` int(30) NOT NULL,
  `j_id` int(30) NOT NULL,
  `u_id` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `applied_jobs`
--

INSERT INTO `applied_jobs` (`a_id`, `j_id`, `u_id`) VALUES
(2, 4, 20),
(4, 4, 22),
(5, 4, 25),
(6, 6, 25);

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `j_id` int(30) NOT NULL,
  `u_id` int(30) NOT NULL,
  `u_name` varchar(30) NOT NULL,
  `c_name` varchar(100) NOT NULL,
  `j_title` varchar(100) NOT NULL,
  `j_location` varchar(100) NOT NULL,
  `j_detail` varchar(2000) NOT NULL,
  `a_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`j_id`, `u_id`, `u_name`, `c_name`, `j_title`, `j_location`, `j_detail`, `a_status`) VALUES
(4, 21, 'New Recruiter', 'Google', 'Programmer', 'USA', 'Required Skills: C/C++, JAVA.\r\nDeadline: 20/04/2019', 1),
(6, 24, 'Another Recruiter', 'ABC company', 'Andriod Developer', 'Dhaka', 'Must have some published app.', 1),
(7, 24, 'Another Recruiter', 'MSL', 'Web Developer', 'Gulsan Link Road', 'This is a check post.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_info`
--

CREATE TABLE `users_info` (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `user_relationship_status` varchar(30) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_location` varchar(20) NOT NULL,
  `user_gender` varchar(8) NOT NULL,
  `user_dob` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_info`
--

INSERT INTO `users_info` (`user_id`, `user_name`, `user_email`, `user_type`, `user_relationship_status`, `user_password`, `user_location`, `user_gender`, `user_dob`) VALUES
(18, 'Admin Admin', 'admin@gmail.com', 'Admin', 'In a Relationship', '1234', 'Banani', 'Male', '01/04/1995'),
(20, 'New Applicant', 'applicant@gmail.com', 'Applicant', 'In a Relationship', '1234', 'Banani', 'Male', '20/04/1996'),
(21, 'New Recruiter', 'recruiter@gmail.com', 'Recruiter', 'Separated', '1234', 'Banani', 'Male', '20/04/1971'),
(22, 'Another Applicant', 'applicant2@gmail.com', 'Applicant', 'Single', '1234', 'Banani', 'Male', '20/04/1971'),
(24, 'Another Recruiter', 'recruiter1@gmail.com', 'Recruiter', 'Single', '1234', 'Mohakhali', 'Male', '08/03/2019'),
(25, 'XYZ Applicant', 'xyz@gmail.com', 'Applicant', 'Single', '1234', 'Khilkhet', 'Male', '20/04/1995');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`j_id`);

--
-- Indexes for table `users_info`
--
ALTER TABLE `users_info`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  MODIFY `a_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `j_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users_info`
--
ALTER TABLE `users_info`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
