CREATE TABLE `contact` (
  `id_contact` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(11) NOT NULL,
  `contact_name` varchar(45) NOT NULL,
  `contact_email` varchar(50) NOT NULL,
  `message` mediumtext NOT NULL,
  PRIMARY KEY (`id_contact`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci