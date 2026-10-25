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

USE fishingLab;

INSERT INTO usuario (nome, sobrenome, email, senha) VALUES
('Ana', 'Silva', 'ana@email.com', 'hash_simulado_ana'),
('Carlos', 'Souza', 'carlos@email.com', 'hash_simulado_carlos'),
('Mariana', 'Costa', 'mariana@email.com', 'hash_simulado_mariana');

INSERT INTO categoria (nome) VALUES
('Espécies de Peixes'),
('Equipamentos'),
('Técnicas de Pesca');

INSERT INTO pergunta (enunciado, alternativaA, alternativaB, alternativaC, alternativaD, correta, fkCategoria) VALUES
('Qual é uma das principais características do tucunaré?',
'Comportamento calmo durante a captura',
'Força e comportamento agressivo',
'Hábito de viver exclusivamente no mar',
'Alimentação baseada apenas em plantas',
'B', 1),

('Em quais ambientes o tucunaré pode ser encontrado?',
'Oceanos e recifes de coral',
'Apenas em águas salgadas',
'Rios, lagos e represas',
'Exclusivamente em manguezais',
'C', 1),

('Qual é o nome científico utilizado para identificar o grupo dos tucunarés?',
'Cichla spp.',
'Oreochromis niloticus',
'Cyprinus carpio',
'Piaractus mesopotamicus',
'A', 1),

('Qual das espécies abaixo é conhecida por ser um peixe de água doce?',
'Sardinha oceânica',
'Atum',
'Robalo-flecha',
'Tilápia',
'D', 1),

('Qual é a principal função de uma vara de pesca?',
'Armazenar as iscas utilizadas',
'Auxiliar no arremesso e controle do peixe',
'Medir a temperatura da água',
'Identificar a espécie capturada',
'B', 2),

('Qual equipamento permite armazenar e recolher a linha de pesca?',
'Chumbada',
'Boia',
'Molinete',
'Anzol',
'C', 2),

('O que deve ser considerado na escolha da linha de pesca?',
'Apenas a cor da embalagem',
'Somente o comprimento da vara',
'Apenas a marca do equipamento',
'A resistência da linha e o peixe desejado',
'D', 2),

('Qual é o objetivo de utilizar iscas artificiais na pescaria?',
'Imitar presas e estimular o ataque dos peixes',
'Aumentar automaticamente a resistência da linha',
'Impedir que os peixes se aproximem',
'Substituir a necessidade de utilizar anzóis',
'A', 3),

('Na pesca com iscas artificiais, o que significa trabalhar a isca?',
'Deixar a vara guardada durante a pescaria',
'Movimentar a isca para simular uma presa',
'Retirar toda a linha do equipamento',
'Manter a isca sempre fora da água',
'B', 3),

('Por que variar a velocidade de recolhimento de uma isca artificial?',
'Para alterar a espécie do peixe capturado',
'Para eliminar a necessidade de arremessos',
'Para modificar o movimento da isca e atrair os peixes',
'Para impedir que a isca se movimente',
'C', 3);

INSERT INTO tentativa (pontuacao, fkUsuario) VALUES
(8, 1),
(6, 2),
(9, 3);

INSERT INTO resposta (alternativa, fkTentativa, fkPergunta) VALUES
('B', 1, 1),
('C', 1, 2),
('A', 1, 3),
('D', 1, 4),
('B', 1, 5),
('C', 1, 6),
('A', 1, 7),
('A', 1, 8),
('B', 1, 9),
('D', 1, 10);

INSERT INTO resposta (alternativa, fkTentativa, fkPergunta) VALUES
('B', 2, 1),
('A', 2, 2),
('A', 2, 3),
('C', 2, 4),
('B', 2, 5),
('C', 2, 6),
('A', 2, 7),
('A', 2, 8),
('D', 2, 9),
('C', 2, 10);

INSERT INTO resposta (alternativa, fkTentativa, fkPergunta) VALUES
('B', 3, 1),
('C', 3, 2),
('A', 3, 3),
('D', 3, 4),
('B', 3, 5),
('C', 3, 6),
('D', 3, 7),
('A', 3, 8),
('B', 3, 9),
('A', 3, 10);

SELECT * FROM usuario;
SELECT * FROM categoria;
SELECT * FROM pergunta;
SELECT * FROM tentativa;
SELECT * FROM resposta;

USE fishingLab;

-- SELECTS --

-- 1. Exibir todos os usuários cadastrados
SELECT * FROM usuario;

-- 2. Exibir nome, sobrenome e email dos usuários
SELECT nome, sobrenome, email
FROM usuario;

-- 3. Consultar usuários com o nome Ana
SELECT * FROM usuario
WHERE nome = 'Ana';

-- 4. Exibir perguntas da categoria 1
SELECT * FROM pergunta
WHERE fkCategoria = 1;

-- 5. Exibir tentativas da maior para a menor pontuação
SELECT * FROM tentativa
ORDER BY pontuacao DESC;

-- 6. Exibir perguntas cuja alternativa correta seja B
SELECT enunciado, correta
FROM pergunta
WHERE correta = 'B';

-- 7. Exibir as perguntas e suas categorias
SELECT
    p.enunciado AS Pergunta,
    c.nome AS Categoria
FROM pergunta AS p
JOIN categoria AS c
    ON p.fkCategoria = c.idCategoria;

-- 8. Exibir o histórico de tentativas dos usuários
SELECT
    u.nome AS Usuario,
    t.pontuacao AS Pontuacao,
    t.dataTentativa AS Data
FROM usuario AS u
JOIN tentativa AS t
    ON t.fkUsuario = u.idUsuario;

-- 9. Exibir as respostas escolhidas e o gabarito
SELECT
    p.enunciado AS Pergunta,
    r.alternativa AS RespostaUsuario,
    p.correta AS RespostaCorreta
FROM resposta AS r
JOIN pergunta AS p
    ON r.fkPergunta = p.idPergunta;

-- 10. Exibir usuário, tentativa e respostas escolhidas
SELECT
    u.nome AS Usuario,
    t.idTentativa AS Tentativa,
    r.alternativa AS Resposta
FROM usuario AS u
JOIN tentativa AS t
    ON t.fkUsuario = u.idUsuario
JOIN resposta AS r
    ON r.fkTentativa = t.idTentativa;

-- 11. Exibir as perguntas respondidas e suas categorias
SELECT
    c.nome AS Categoria,
    p.enunciado AS Pergunta,
    r.alternativa AS Resposta
FROM categoria AS c
JOIN pergunta AS p
    ON p.fkCategoria = c.idCategoria
JOIN resposta AS r
    ON r.fkPergunta = p.idPergunta;

-- 12. Contar quantos usuários estão cadastrados
SELECT COUNT(*) AS TotalUsuarios
FROM usuario;

-- 13. Consultar a média das pontuações
SELECT AVG(pontuacao) AS MediaPontuacao
FROM tentativa;

-- 14. Consultar a maior pontuação registrada
SELECT MAX(pontuacao) AS MaiorPontuacao
FROM tentativa;

-- 15. Contar quantas perguntas existem em cada categoria
SELECT
    c.nome AS Categoria,
    COUNT(p.idPergunta) AS QuantidadePerguntas
FROM categoria AS c
JOIN pergunta AS p
    ON p.fkCategoria = c.idCategoria
GROUP BY c.idCategoria, c.nome;
