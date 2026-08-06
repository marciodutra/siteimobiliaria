const express = require("express");

const router = express.Router();


const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");


const {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
} = require("../controllers/contrato.controller");





router.get(
    "/",
    auth,
    role("CORRETOR"),
    listar
);





router.get(
    "/:id",
    auth,
    role("CORRETOR"),
    buscarPorId
);





router.post(
    "/",
    auth,
    role("CORRETOR"),
    criar
);





router.put(
    "/:id",
    auth,
    role("CORRETOR"),
    atualizar
);





router.delete(
    "/:id",
    auth,
    role("CORRETOR"),
    remover
);


module.exports = router;