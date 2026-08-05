const express = require("express");
const multer = require("multer");

const router = express.Router();

const imagemController = require("../controllers/imagem.controller");


const storage = multer.memoryStorage();


const upload = multer({
    storage
});


router.post(
    "/:imovelId",
    upload.array("imagens", 10),
    imagemController.adicionarImagem
);


router.delete(
    "/:id",
    imagemController.removerImagem
);


module.exports = router;