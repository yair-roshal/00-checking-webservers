 
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
 
CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `web_serv_id` varchar(99) NOT NULL,
  `status` varchar(99) NOT NULL,
  `latency` varchar(99) NOT NULL,
  `created` varchar(99) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 

CREATE TABLE `webservers` (
  `id` int(11) NOT NULL,
  `name` varchar(99) NOT NULL,
  `uri` text NOT NULL,
  `status` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 

INSERT INTO `webservers` (`id`, `name`, `uri`) VALUES
(1, 'google', 'https://www.google.com'),
(2, 'monolith', 'https://www.monolith.co.il/'),
(3, 'funny', 'https://www.pexels.com/search/funny/');

 
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

 
ALTER TABLE `webservers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

 
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6400;

 
ALTER TABLE `webservers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;
 