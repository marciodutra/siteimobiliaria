const express = require("express");

const router = express.Router();


const auth = require("../middlewares/auth.middleware");


const {

    meusImoveis

} = require("../controllers/cliente.controller");



router.get(

    "/meus-imoveis",

    auth,

    meusImoveis

);



module.exports = router;