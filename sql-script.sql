DROP DATABASE tickettoc;
CREATE DATABASE IF NOT EXISTS tickettoc;

USE tickettoc;

CREATE TABLE IF NOT EXISTS Projet (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    nomEntreprise VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Client (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    nomEntreprise VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Ticket (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    nomEntreprise VARCHAR(100),
    importance ENUM('HIGHT','MODERATE','LOW'),
    etatAvancement ENUM('TODO','INPROGRESS','DONE'),
    description TEXT,
    date DATE,
    idProjet INTEGER,
    idClient INTEGER,
    FOREIGN KEY (idProjet) REFERENCES Projet(id),
    FOREIGN KEY (idClient) REFERENCES Client(id)
);

CREATE TABLE IF NOT EXISTS Developpeur (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    noisettes INTEGER,
    profilePicture text,
    idTicket INTEGER,
    FOREIGN KEY (idTicket) REFERENCES Ticket(id)
);


CREATE TABLE IF NOT EXISTS Rapporteur (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    profilePicture text,
    idTicket INTEGER,
    FOREIGN KEY (idTicket) REFERENCES Ticket(id)
);