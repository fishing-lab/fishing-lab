var database = require("../database/config");
var mysql = require("mysql2");

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nome, email
        FROM usuario
        WHERE email = ? AND senha = ?;
    `;
    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES (?, ?, ?);
    `;
    return database.executar(instrucaoSql, [nome, email, senha]);
}

function atualizar(idUsuario, nome, email, senha) {
    var instrucaoSql = `
        UPDATE usuario
        SET nome = ?, email = ?
        WHERE idUsuario = ? AND senha = ?;
    `;
    return database.executar(instrucaoSql, [nome, email, idUsuario, senha]);
}

function excluir(idUsuario, senha) {
    return new Promise(function(resolve, reject) {
        var conexao = mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });

        function erroExclusao(erro) {
            conexao.rollback(function() {
                conexao.end();
                reject(erro);
            });
        }

        conexao.beginTransaction(function(erro) {
            if (erro) {
                conexao.end();
                reject(erro);
            } else {
                conexao.query(
                    "SELECT idUsuario FROM usuario WHERE idUsuario = ? AND senha = ? FOR UPDATE",
                    [idUsuario, senha],
                    function(erro, usuarios) {
                        if (erro) {
                            erroExclusao(erro);
                        } else if (usuarios.length == 0) {
                            erroExclusao(new Error("SENHA_INCORRETA"));
                        } else {
                            conexao.query(
                                "DELETE FROM resposta WHERE fkTentativa IN (SELECT idTentativa FROM tentativa WHERE fkUsuario = ?)",
                                [idUsuario],
                                function(erro) {
                                    if (erro) {
                                        erroExclusao(erro);
                                    } else {
                                        conexao.query(
                                            "DELETE FROM tentativa WHERE fkUsuario = ?",
                                            [idUsuario],
                                            function(erro) {
                                                if (erro) {
                                                    erroExclusao(erro);
                                                } else {
                                                    conexao.query(
                                                        "DELETE FROM usuario WHERE idUsuario = ? AND senha = ?",
                                                        [idUsuario, senha],
                                                        function(erro, resultado) {
                                                            if (erro) {
                                                                erroExclusao(erro);
                                                            } else {
                                                                conexao.commit(function(erro) {
                                                                    if (erro) {
                                                                        erroExclusao(erro);
                                                                    } else {
                                                                        conexao.end();
                                                                        resolve(resultado);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    });
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar,
    excluir
};
