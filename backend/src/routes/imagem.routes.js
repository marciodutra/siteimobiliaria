const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const imagemController = require("../controllers/imagem.controller");

const pastaUpload = "uploads/imoveis";

if (!fs.existsSync(pastaUpload)) {
    fs.mkdirSync(pastaUpload, {
        recursive: true
    });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, pastaUpload);

    },

    filename(req, file, cb) {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});

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