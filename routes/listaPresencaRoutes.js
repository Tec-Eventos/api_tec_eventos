const { Router } = require("express");
const router = require("express").Router();
const { getListaPresenca } = require("../controllers/listaPresencaController")


router.get("/listaPresenca/:cd_evento", getListaPresenca);

module.exports = router;