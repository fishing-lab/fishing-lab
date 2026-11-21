
var quizModel = require("../models/quizModel");

function submeter(req, res) {

    var fkUsuario = req.body.fkUsuarioServer;
    var acertos = req.body.acertosServer;

    var questao1 = req.body.questao1Server;
    var questao2 = req.body.questao2Server;
    var questao3 = req.body.questao3Server;
    var questao4 = req.body.questao4Server;
    var questao5 = req.body.questao5Server;
    var questao6 = req.body.questao6Server;
    var questao7 = req.body.questao7Server;
    var questao8 = req.body.questao8Server;
    var questao9 = req.body.questao9Server;
    var questao10 = req.body.questao10Server;

    if (fkUsuario == undefined || acertos == undefined) {
        res.status(400).send("Dados da tentativa não informados!");
    } else if (
        questao1 == undefined || questao2 == undefined ||
        questao3 == undefined || questao4 == undefined ||
        questao5 == undefined || questao6 == undefined ||
        questao7 == undefined || questao8 == undefined ||
        questao9 == undefined || questao10 == undefined
    ) {
        res.status(400).send("Respostas não informadas!");
    } else {

        quizModel.iniciarQuiz(fkUsuario, acertos)
            .then(function(resultado) {

                var fkTentativa = resultado.insertId;

                return quizModel.submeter(
                    fkTentativa,
                    questao1, questao2, questao3, questao4, questao5,
                    questao6, questao7, questao8, questao9, questao10
                );

            })
            .then(function(resultado) {
                res.json(resultado);
            })
            .catch(function(erro) {
                console.log("Erro ao salvar quiz:", erro);
                res.status(500).send("Erro ao salvar as respostas do quiz.");
            });
    }
}

// Busca o histórico de tentativas de um usuário
function buscarHistorico(req, res) {

    var fkUsuario = Number(req.params.idUsuario);
    console.log("Buscando histórico do usuário:", fkUsuario);

    if (!Number.isInteger(fkUsuario) || fkUsuario <= 0) {
        res.status(400).send("ID do usuário inválido!");
    } else {

        quizModel.buscarHistorico(fkUsuario)
            .then(function(resultado) {
                res.json(resultado);
            })
            .catch(function(erro) {
                console.log("Erro ao buscar histórico:", erro);
                res.status(500).send("Erro ao buscar histórico do quiz.");
            });
    }
}

module.exports = {
    submeter,
    buscarHistorico
};