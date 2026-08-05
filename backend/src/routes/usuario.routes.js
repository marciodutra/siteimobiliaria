const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
    criarUsuario,
    listarUsuarios,
    editarUsuario,
    excluirUsuario
} = require("../controllers/usuario.controller");


const storage = multer.memoryStorage();

const upload = multer({
    storage
});


router.post(
    "/",
    upload.single("foto"),
    criarUsuario
);


router.get("/", listarUsuarios);


router.put("/:id", editarUsuario);


router.delete("/:id", excluirUsuario);


module.exports = router;