const express = require("express");

const router = express.Router();

const mensagemController = require("../controllers/mensagem.controller");



router.post(
    "/",
    mensagemController.criar
);



module.exports = router;