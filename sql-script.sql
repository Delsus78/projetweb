DROP DATABASE tickettac;
CREATE DATABASE IF NOT EXISTS tickettac;

USE tickettac;

CREATE TABLE tickettac.developpeur (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(255) DEFAULT NULL,
  prenom VARCHAR(255) DEFAULT NULL,
  profilPicture VARCHAR(255) DEFAULT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  noisettes INT DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE tickettac.client (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(50) DEFAULT NULL,
  prenom VARCHAR(255) DEFAULT NULL,
  entreprise VARCHAR(255) DEFAULT NULL,
  email VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE tickettac.projet (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE tickettac.rapporteur (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(255) DEFAULT NULL,
  prenom VARCHAR(255) DEFAULT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profilPicture VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE tickettac.ticket (
  id INT NOT NULL AUTO_INCREMENT,
  idDev INT,
  idRapporteur INT,
  nom VARCHAR(255) DEFAULT NULL,
  dateStart DATETIME DEFAULT NULL,
  etatAvancement ENUM('A_FAIRE','EN_COURS','FINI') DEFAULT NULL,
  importance ENUM('URGENT','IMPORTANT','MINEUR') DEFAULT NULL,
  description TEXT DEFAULT NULL,
  idProjet INT,
  idClient INT,
  dateAssign DATETIME DEFAULT NULL,
  dateEnd DATETIME DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

ALTER TABLE tickettac.ticket
    ADD CONSTRAINT FK_ticket_idClient FOREIGN KEY (idClient)
        REFERENCES tickettac.client(id) ON DELETE SET NULL;

ALTER TABLE tickettac.ticket
    ADD CONSTRAINT FK_ticket_idDev FOREIGN KEY (idDev)
        REFERENCES tickettac.developpeur(id) ON DELETE SET NULL ;

ALTER TABLE tickettac.ticket
    ADD CONSTRAINT FK_ticket_idProjet FOREIGN KEY (idProjet)
        REFERENCES tickettac.projet(id) ON DELETE SET NULL ;

ALTER TABLE tickettac.ticket
    ADD CONSTRAINT FK_ticket_idRapporteur FOREIGN KEY (idRapporteur)
        REFERENCES tickettac.rapporteur(id) ON DELETE SET NULL ;