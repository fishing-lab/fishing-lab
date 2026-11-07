var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

// Recebendo as respostas do quiz e enviando para o controller
router.post("/submeter", function (req, res) {
    quizController.submeter(req, res);
});

module.exports = router;
