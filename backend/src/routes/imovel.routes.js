const express = require("express");

const router = express.Router();

const {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
} = require("../controllers/imovel.controller");


const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");



router.get("/", listar);


router.get("/:id", buscarPorId);



router.post(
    "/",
    auth,
    role("CORRETOR", "ADMIN"),
    criar
);



router.put(
    "/:id",
    auth,
    role("CORRETOR", "ADMIN"),
    atualizar
);



router.delete(
    "/:id",
    auth,
    role("CORRETOR", "ADMIN"),
    remover
);



module.exports = router;