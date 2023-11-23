const { Router } = require("express");
const router = require("express").Router();
const { createQRCode, getQRCodeValidator } = require("../controllers/qrcodeController")


router.post("/qrcode", createQRCode);
router.get("/qrcode/:cd_evento/:rm_aluno", getQRCodeValidator);

module.exports = router;