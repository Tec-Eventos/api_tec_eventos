const { Router } = require("express");
const { createTipoIngresso, updateTipoIngresso } = require("../controllers/tipoIngressoController");
const router = require("express").Router();

router.post("/ingresso", createTipoIngresso);
router.patch("/ingresso/update/:cd_evento", updateTipoIngresso);


module.exports = router;