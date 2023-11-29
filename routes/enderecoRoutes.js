const { Router } = require("express");
const { createEndereco, updateEndereco, deleteEndereco } = require("../controllers/enderecoController");
const router = require("express").Router();

router.post("/endereco", createEndereco);
router.patch("/endereco/:cep", updateEndereco);
router.delete("/endereco/:cep", deleteEndereco);

module.exports = router;