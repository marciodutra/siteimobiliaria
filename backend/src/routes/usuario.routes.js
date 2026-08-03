const express = require("express");

const router = express.Router();


const {
    criarUsuario
} = require("../controllers/usuario.controller");



router.post("/", criarUsuario);



module.exports = router;