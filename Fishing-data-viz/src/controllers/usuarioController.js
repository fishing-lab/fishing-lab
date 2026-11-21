var usuarioModel = require("../models/usuarioModel");

function senhaValida(senha) {
    let temMaiuscula = false;
    let temMinuscula = false;
    let temNumero = false;
    let temEspecial = false;
    let especiais = "!@#$%&*()-_=+[]{};:,.?/\\|<>~^";

    for (let i = 0; i < senha.length; i++) {
        let letra = senha[i];

        if (letra >= "A" && letra <= "Z") {
            temMaiuscula = true;
        } else if (letra >= "a" && letra <= "z") {
            temMinuscula = true;
        } else if (letra >= "0" && letra <= "9") {
            temNumero = true;
        } else if (especiais.includes(letra)) {
            temEspecial = true;
        }
    }

    return senha.length >= 8 && temMaiuscula && temMinuscula && temNumero && temEspecial;
}

function autenticar(req, res) {
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (!email || !senha) {
        res.status(400).send("Informe o e-mail e a senha.");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function(resultado) {
                if (resultado.length == 1) {
                    res.json({
                        idUsuario: resultado[0].idUsuario,
                        nome: resultado[0].nome,
                        email: resultado[0].email
                    });
                } else {
                    res.status(403).send("E-mail ou senha incorretos.");
                }
            })
            .catch(function() {
                res.status(500).send("Erro ao realizar login.");
            });
    }
}

function cadastrar(req, res) {
    let nome = req.body.nomeServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (typeof nome != "string" || typeof email != "string" || typeof senha != "string" ||
        nome.trim() == "" || email.trim() == "") {
        res.status(400).send("Preencha todos os campos.");
    } else if (!senhaValida(senha)) {
        res.status(400).send("A senha deve ter 8 caracteres, maiúscula, minúscula, número e caractere especial.");
    } else {
        usuarioModel.cadastrar(nome.trim(), email.trim(), senha)
            .then(function(resultado) {
                res.json(resultado);
            })
            .catch(function(erro) {
                if (erro.code == "ER_DUP_ENTRY") {
                    res.status(409).send("E-mail já cadastrado.");
                } else {
                    res.status(500).send("Erro ao realizar cadastro.");
                }
            });
    }
}

function atualizar(req, res) {
    let idUsuario = Number(req.body.idUsuarioServer);
    let nome = req.body.nomeServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (!Number.isInteger(idUsuario) || idUsuario <= 0 ||
        typeof nome != "string" || typeof email != "string" || typeof senha != "string" ||
        nome.trim() == "" || email.trim() == "" || senha == "") {
        res.status(400).send("Preencha os dados corretamente.");
    } else {
        usuarioModel.atualizar(idUsuario, nome.trim(), email.trim(), senha)
            .then(function(resultado) {
                if (resultado.affectedRows == 0) {
                    res.status(403).send("Senha incorreta.");
                } else {
                    res.json({ nome: nome.trim(), email: email.trim() });
                }
            })
            .catch(function(erro) {
                if (erro.code == "ER_DUP_ENTRY") {
                    res.status(409).send("E-mail já cadastrado.");
                } else {
                    res.status(500).send("Erro ao atualizar perfil.");
                }
            });
    }
}

function excluir(req, res) {
    let idUsuario = Number(req.body.idUsuarioServer);
    let senha = req.body.senhaServer;

    if (!Number.isInteger(idUsuario) || idUsuario <= 0 || typeof senha != "string" || senha == "") {
        res.status(400).send("Informe os dados corretamente.");
    } else {
        usuarioModel.excluir(idUsuario, senha)
            .then(function() {
                res.json({ mensagem: "Conta excluída com sucesso." });
            })
            .catch(function(erro) {
                if (erro.message == "SENHA_INCORRETA") {
                    res.status(403).send("Senha incorreta.");
                } else {
                    res.status(500).send("Erro ao excluir a conta.");
                }
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar,
    excluir
};