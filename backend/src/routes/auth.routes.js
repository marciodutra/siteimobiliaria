const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/auth.controller");

const storage = multer.memoryStorage();

const upload = multer({
    storage
});

router.post(
    "/register",
    upload.single("foto"),
    register
);

router.post(
    "/login",
    login
);

module.exports = router;