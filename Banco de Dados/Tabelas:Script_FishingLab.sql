CREATE DATABASE fishingLab;

USE fishingLab;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE tentativa (
    idTentativa INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    acertos INT NOT NULL,
    CONSTRAINT fkUsuarioTentativa
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(idUsuario)
);

CREATE TABLE resposta (
    fkTentativa INT PRIMARY KEY,
    questao1 CHAR(1) NOT NULL,
    questao2 CHAR(1) NOT NULL,
    questao3 CHAR(1) NOT NULL,
    questao4 CHAR(1) NOT NULL,
    questao5 CHAR(1) NOT NULL,
    questao6 CHAR(1) NOT NULL,
    questao7 CHAR(1) NOT NULL,
    questao8 CHAR(1) NOT NULL,
    questao9 CHAR(1) NOT NULL,
    questao10 CHAR(1) NOT NULL,
    CONSTRAINT fkTentativaResposta
        FOREIGN KEY (fkTentativa)
        REFERENCES tentativa(idTentativa)
);
