CREATE DATABASE gestioneventos;
USE gestioneventos;

CREATE TABLE Eventos(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    direccion VARCHAR(50),
    fechaInicio DATE,
    fechaFinal DATE,
    estado INT,
    comentario VARCHAR(50)
);

CREATE TABLE Usuarios(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

CREATE TABLE Asistencias(
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuarioId INT NOT NULL,
    eventoId INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id),
    FOREIGN KEY (eventoId) REFERENCES Eventos(id)
);