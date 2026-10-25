CREATE DATABASE fishingLab;

USE fishingLab;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
sobrenome VARCHAR(45),
email VARCHAR(50) UNIQUE NOT NULL,
senha VARCHAR(100) NOT NULL
);

CREATE TABLE tentativa (
idTentativa INT PRIMARY KEY AUTO_INCREMENT,
pontuacao INT,
dataTentativa DATETIME DEFAULT CURRENT_TIMESTAMP,
fkUsuario INT NOT NULL,
CONSTRAINT fkUsuarioTentativa
	FOREIGN KEY (fkUsuario)
		REFERENCES usuario (idUsuario)
);

CREATE TABLE categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE pergunta (
idPergunta INT PRIMARY KEY AUTO_INCREMENT,
enunciado VARCHAR(300),
alternativaA VARCHAR(150),
alternativaB VARCHAR(150),
alternativaC VARCHAR(150),
alternativaD VARCHAR(150),
correta CHAR(1) NOT NULL,
CONSTRAINT chkCorreta
	CHECK (correta IN('A', 'B', 'C', 'D')),
fkCategoria INT NOT NULL,
CONSTRAINT fkCategoriaPergunta
	FOREIGN KEY (fkCategoria)
		REFERENCES categoria (idCategoria)
);

CREATE TABLE resposta (
idResposta INT PRIMARY KEY AUTO_INCREMENT,
alternativa CHAR(1) NOT NULL,
CONSTRAINT chkAlternativa
	CHECK (alternativa IN('A', 'B', 'C', 'D')),
fkTentativa INT NOT NULL,
CONSTRAINT fkRespostaTentativa
	FOREIGN KEY (fkTentativa)
		REFERENCES tentativa (idTentativa),
fkPergunta INT NOT NULL,
CONSTRAINT fkRespostaPergunta
	FOREIGN KEY (fkPergunta)
		REFERENCES pergunta (idPergunta),
CONSTRAINT unRespostaTentativa
    UNIQUE (fkTentativa, fkPergunta)
);

INSERT INTO usuario (nome, sobrenome, email, senha) VALUES
('Ana', 'Silva', 'ana@email.com', 'hash_simulado_ana'),
('Carlos', 'Souza', 'carlos@email.com', 'hash_simulado_carlos'),
('Bruna', 'Costa', 'mariana@email.com', 'hash_simulado_bruna');

INSERT INTO categoria (nome) VALUES
('Espécies de Peixes'),
('Equipamentos'),
('Técnicas de Pesca');

INSERT INTO pergunta (enunciado, alternativaA, alternativaB, alternativaC, alternativaD, correta, fkCategoria) VALUES
('Qual destes peixes é conhecido por sua força e agressividade?',
 'Tilápia', 'Tucunaré', 'Lambari', 'Carpa', 'B', 1),

('Qual equipamento é utilizado para armazenar a linha de pesca?',
 'Anzol', 'Boia', 'Molinete', 'Chumbada', 'C', 2),

('Qual técnica utiliza uma isca artificial em movimento para atrair o peixe?',
'Pesca de espera', 'Pesca de fundo', 'Pesca com ceva', 'Pesca de arremesso', 'D', 3);

INSERT INTO tentativa (pontuacao, fkUsuario) VALUES
(2, 1),
(1, 2),
(3, 3);

INSERT INTO resposta (alternativa, fkTentativa, fkPergunta) VALUES
('B', 1, 1),
('A', 1, 2),
('D', 1, 3);

SELECT * FROM usuario;
SELECT * FROM categoria;
SELECT * FROM pergunta;
SELECT * FROM tentativa;
SELECT * FROM resposta;
