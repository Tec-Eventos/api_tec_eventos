const { Router } = require("express");
const router = require("express").Router();
const { createQRCode, getQRCodeValidator, selectQrCodeAluno } = require("../controllers/qrcodeController")


router.post("/qrcode", createQRCode);
router.get("/qrcode/:cd_evento/:rm_aluno", getQRCodeValidator);
router.get("/qrCodeAluno/:cd_evento/:rm_aluno", selectQrCodeAluno);

module.exports = router;