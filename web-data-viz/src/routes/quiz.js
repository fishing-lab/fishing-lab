
var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

// Recebendo as respostas do quiz e enviando para o controller
router.post("/submeter", function (req, res) {
    quizController.submeter(req, res);
});

// Buscando o histórico de tentativas do usuário
router.get("/historico/:idUsuario", function (req, res) {
    quizController.buscarHistorico(req, res);
});

module.exports = router;