-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2022 at 08:12 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationspro`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` char(100) CHARACTER SET utf8 NOT NULL,
  `vacationId` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
('0', 11),
('50f90c73-1dcb-4caf-b4e8-1853a8581190', 11),
('dd346864-29cb-4f66-ba8c-66b5e600fc24', 11),
('dd346864-29cb-4f66-ba8c-66b5e600fc24', 13),
('dd346864-29cb-4f66-ba8c-66b5e600fc24', 14),
('dd346864-29cb-4f66-ba8c-66b5e600fc24', 15),
('ee5a4ee0-3d5e-4ac3-862a-eee9df6c1a74', 14);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` char(100) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
('', 'eran', 'samimian', 'erani', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', ''),
('0', 'eran', 'samimian10', 'samimian10', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', ''),
('48bd2751-c866-4e43-9b8b-821708422c1a', 'admin', 'admin', 'admin', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'admin'),
('5', 'Moishe', 'Ufnik', 'moshiko', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', ''),
('50f90c73-1dcb-4caf-b4e8-1853a8581190', 'hadar', 'hadarba', 'hadarba', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'RegularUse'),
('5a13df1d-1b2f-4119-8b69-3383c8efa642', 'tt', 'tt', 'tt', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'undefined'),
('63175', 'Kipi', 'Ben-Kipod', 'kipodi', '1611ee302fa9a366b6cddafd095bfd705b487e839e9278e76bbae34d49274fa2a9d15645b05f42814003dfed7d0dc715a1e5799007ffaca55e86cc39f6ce94b4', ''),
('716', 'Ugi', 'Fletzet', 'ugifletzet', '647f13d755f48b64e5a73243adc62868bead6d9bc1971f47f9bd6424d7cc2b1811d5b2052ac50dd6ab21bbde373b9bd93a09e9e667356e116c07ce8b08f5a3ed', ''),
('7daa4360-c4ae-4def-8643-1952a8c197b7', 'eran123', '123', '123', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'undefined'),
('c268926e-f99d-481a-8aca-8b629dcd151f', 'eransam123123', 'samsam123', 'samsam12312', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', ''),
('dd346864-29cb-4f66-ba8c-66b5e600fc24', 'eran', 'sam', 'eransam', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', ''),
('dd95710e-4b85-4188-b4de-4095eb04ee18', 'hadar', 'd', 'hadar', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'RegularUse'),
('ee5a4ee0-3d5e-4ac3-862a-eee9df6c1a74', 'er123', 'er123', 'er123', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'RegularUse'),
('ee69c1e5-73c4-4d11-abc6-22ff295a1e00', 'sasa', 'sasa', 'sasa', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'undefined'),
('f45b6c73-c726-4066-bcf5-5c384d03b4f3', 'trtr', 'trtr', 'trtr', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'userrole');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `imageName` varchar(1000) NOT NULL,
  `isFollow` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `startDate`, `endDate`, `price`, `imageName`, `isFollow`) VALUES
(11, 'usa', '2022-05-02 08:56:00', '2022-05-09 08:56:00', '450', '368d475d-399b-4609-a715-1e5f259eafd9.png', 0),
(12, 'vina', '2022-05-02 09:02:00', '2022-05-25 09:02:00', '354', '2b3c35da-fd1e-4f28-8bd0-2d8ce1aef58c.jpg', 0),
(13, 'japan', '2022-05-08 03:03:00', '2022-05-31 03:03:00', '253', 'a36d3d6a-a933-4998-84e9-2bfb24aa471f.jpg', 0),
(14, 'thiland', '2022-05-09 15:08:00', '2022-05-24 15:08:00', '199', 'cc3dcacc-bb0e-441d-b920-f79279b4f180.jpg', 0),
(15, 'monaco', '2022-05-16 05:46:00', '2022-05-17 05:46:00', '245', '99f1ce63-2ad4-4f53-be61-35ccbe0a7a6f.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
