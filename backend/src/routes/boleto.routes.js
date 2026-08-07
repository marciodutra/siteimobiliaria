const express = require("express");

const router = express.Router();


const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");


const {
    gerar,
    listarCliente,
    listarCorretor,
    pagar
} = require("../controllers/boleto.controller");




// Cliente - visualizar boletos

router.get(
    "/cliente",
    auth,
    role("CLIENTE"),
    listarCliente
);




// Corretor - visualizar boletos dos contratos

router.get(
    "/corretor",
    auth,
    role("CORRETOR"),
    listarCorretor
);




// Gerar boletos de um contrato

router.post(
    "/gerar/:contratoId",
    auth,
    role("CORRETOR"),
    gerar
);


// Marcar boleto como pago

router.put(
    "/:id/pagar",
    auth,
    role("CLIENTE"),
    pagar
);



module.exports = router;