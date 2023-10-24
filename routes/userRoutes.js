const { Router } = require("express");
const { createUser, getUserById, getUsers, updateUser, deleteUser, login } = require("../controllers/userController");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", checkToken, getUserById);
router.patch("/:id", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;
