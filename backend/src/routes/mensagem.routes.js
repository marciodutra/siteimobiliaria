const express = require("express");

const router = express.Router();

const mensagemController = require("../controllers/mensagem.controller");

const authMiddleware = require("../middlewares/auth.middleware");



router.post(
    "/",
    mensagemController.criar
);



router.get(
    "/",
    authMiddleware,
    mensagemController.listar
);

router.get(
    "/contador",
    authMiddleware,
    mensagemController.contador
);



router.delete(
    "/:id",
    authMiddleware,
    mensagemController.remover
);



module.exports = router;