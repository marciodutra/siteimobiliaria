const express = require("express");
const multer = require("multer");

const router = express.Router();

const imagemController = require("../controllers/imagem.controller");



const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/imoveis");

    },


    filename:(req,file,cb)=>{

        const nome =
        Date.now()+"-"+file.originalname;

        cb(null,nome);

    }

});



const upload = multer({
    storage
});




router.post(

    "/:imovelId",

    upload.array("imagens",10),

    imagemController.adicionarImagem

);



router.delete(

    "/:id",

    imagemController.removerImagem

);



module.exports = router;