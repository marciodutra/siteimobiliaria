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
} = require("../controllers/corretor.controller");



router.get(
    "/",
    auth,
    role("ADMIN"),
    listar
);



router.get(
    "/:id",
    auth,
    role("ADMIN"),
    buscarPorId
);



router.post(
    "/",
    auth,
    role("ADMIN"),
    criar
);



router.put(
    "/:id",
    auth,
    role("ADMIN"),
    atualizar
);



router.delete(
    "/:id",
    auth,
    role("ADMIN"),
    remover
);



module.exports = router;