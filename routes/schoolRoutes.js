
const { Router } = require("express");
const { createSchool, getSchoolById, getSchools, updateSchool, deleteSchool, login } = require("../controllers/schoolController");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", createSchool);
router.get("/", getSchools);
router.get("/:cdEscolar", checkToken, getSchoolById);
router.patch("/:cdEscolar", checkToken, updateSchool);
router.delete("/:cdEscolar", checkToken, deleteSchool);
router.post("/login", login);

module.exports = router;