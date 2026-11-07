
var database = require("../database/config");

function iniciarQuiz(fkUsuario, acertos) {

    var instrucaoSql = `
        INSERT INTO tentativa (fkUsuario, acertos)
        VALUES (?, ?);
    `;

    return database.executar(instrucaoSql, [fkUsuario, acertos]);
}

function submeter(fkTentativa, questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10) {

    var instrucaoSql = `
        INSERT INTO resposta (fkTentativa, questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    return database.executar(instrucaoSql, [fkTentativa, questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10]);
}

module.exports = {
    iniciarQuiz,
    submeter
};
