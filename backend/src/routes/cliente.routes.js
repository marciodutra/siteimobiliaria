const express = require("express");

const router = express.Router();


const auth = require("../middlewares/auth.middleware");


const {

    meusImoveis,
    meusContratos

} = require("../controllers/cliente.controller");



router.get(

    "/meus-imoveis",

    auth,

    meusImoveis

);

router.get(

    "/meus-contratos",

    auth,

    meusContratos

);



module.exports = router;