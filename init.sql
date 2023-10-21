CREATE DATABASE apiusers;

USE apiusers;

CREATE TABLE usersalunos(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(14) NOT NULL,
    instituicao VARCHAR(14) NOT NULL,
    datanascimento DATE NOT NULL,
    senha VARCHAR(14) NOT NULL
);