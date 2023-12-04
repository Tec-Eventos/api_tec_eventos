const { Router } = require("express");
const { createUser, getUserById, getUsers, updateUser, deleteUser, getAllEventsUser, login } = require("../controllers/userController");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/aluno", createUser);
router.get("/aluno", getUsers);
router.get("/aluno/events/:rm_aluno", getAllEventsUser);
router.get("/aluno/:rm_aluno", getUserById);
router.patch("/aluno/:rm_aluno", checkToken, updateUser);
router.delete("/aluno/:rm_aluno", checkToken, deleteUser);
router.post("/loginAluno", login);

module.exports = router;
