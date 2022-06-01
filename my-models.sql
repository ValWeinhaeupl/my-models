-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 01. Jun 2022 um 20:03
-- Server-Version: 10.4.22-MariaDB
-- PHP-Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `my-models`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `Username` varchar(25) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `profilepicture` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`Username`, `password`, `email`, `profilepicture`) VALUES
('Franz', '912ec803b2ce49e4a541068d495ab570', 'franz@yahoo.com', 'remotefiles/profile-pictures/Franz.png'),
('Jakob', '912ec803b2ce49e4a541068d495ab570', 'jakob@gmail.com', 'remotefiles/profile-pictures/Jakob.png'),
('newuser', '912ec803b2ce49e4a541068d495ab570', 'test_email@gmail.com', 'remotefiles/profile-pictures/newuser.png'),
('valentin', '81dc9bdb52d04dc20036dbd8313ed055', '', 'remotefiles/profile-pictures/valentin.png');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kommentar`
--

CREATE TABLE `kommentar` (
  `KommentarNr` int(10) NOT NULL,
  `username` varchar(25) NOT NULL,
  `PostNr` int(10) NOT NULL,
  `Text` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `kommentar`
--

INSERT INTO `kommentar` (`KommentarNr`, `username`, `PostNr`, `Text`) VALUES
(47, 'Franz', 121, 'Cool object'),
(48, 'valentin', 121, 'Sehr nett gemacht!'),
(49, 'valentin', 123, 'Ich hoffe, es gefällt euch'),
(50, 'newuser', 122, 'hallo, bin neu hier!');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `post`
--

CREATE TABLE `post` (
  `PostNr` int(10) NOT NULL,
  `username` varchar(25) NOT NULL,
  `ObjektPath` varchar(50) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Beschreibung` varchar(100) NOT NULL,
  `Tags` varchar(100) NOT NULL,
  `Likes` int(7) NOT NULL DEFAULT 0,
  `ThumbPath` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `post`
--

INSERT INTO `post` (`PostNr`, `username`, `ObjektPath`, `Name`, `Beschreibung`, `Tags`, `Likes`, `ThumbPath`) VALUES
(120, 'Jakob', 'remotefiles/objects/120.glb', 'Spikes', 'Green spikey ball using displacement map', 'spikey, corona, ball', 0, 'remotefiles/thumbnails/120.png'),
(121, 'Jakob', 'remotefiles/objects/121.glb', 'Affe Susanne', 'Blender standardmodell susanne', 'affe, ape, moneky, susanne', 0, 'remotefiles/thumbnails/121.png'),
(122, 'Franz', 'remotefiles/objects/122.glb', 'Mountain', 'Mountain object using height maps', 'mountain, hill', 0, 'remotefiles/thumbnails/122.png'),
(123, 'valentin', 'remotefiles/objects/123.glb', 'Uhr objekt', 'Hochwertiges Uhrobjekt', 'Uhr, clock, watch', 0, 'remotefiles/thumbnails/123.png');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`Username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indizes für die Tabelle `kommentar`
--
ALTER TABLE `kommentar`
  ADD PRIMARY KEY (`KommentarNr`);

--
-- Indizes für die Tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`PostNr`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `kommentar`
--
ALTER TABLE `kommentar`
  MODIFY `KommentarNr` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT für Tabelle `post`
--
ALTER TABLE `post`
  MODIFY `PostNr` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
