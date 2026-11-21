
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

// Busca todas as tentativas e respostas de um usuário
function buscarHistorico(fkUsuario) {

    var instrucaoSql = `
        SELECT
            t.idTentativa,
            t.dataHora,
            t.acertos,
            r.questao1,
            r.questao2,
            r.questao3,
            r.questao4,
            r.questao5,
            r.questao6,
            r.questao7,
            r.questao8,
            r.questao9,
            r.questao10
        FROM tentativa AS t
        JOIN resposta AS r
            ON t.idTentativa = r.fkTentativa
        WHERE t.fkUsuario = ?
        ORDER BY t.idTentativa ASC;
    `;

    return database.executar(instrucaoSql, [fkUsuario]);
}

module.exports = {
    iniciarQuiz,
    submeter,
    buscarHistorico
};