const express = require("express");

const router = express.Router();


const {
    criarUsuario,
    listarUsuarios,
    editarUsuario,
    excluirUsuario
} = require("../controllers/usuario.controller");



router.post("/", criarUsuario);

router.get("/", listarUsuarios);

router.put("/:id", editarUsuario);

router.delete("/:id", excluirUsuario);


module.exports = router;