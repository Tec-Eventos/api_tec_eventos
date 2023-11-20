const { Router } = require("express");
const { createUser, getUserById, getUsers, updateUser, deleteUser, login } = require("../controllers/userController");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:rm_aluno", checkToken, getUserById);
router.patch("/:rm_aluno", checkToken, updateUser);
router.delete("/:rm_aluno", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;
