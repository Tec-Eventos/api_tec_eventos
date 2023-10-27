
const { Router } = require("express");
const { createSchool, getSchoolById, getSchools, updateSchool, deleteSchool, login } = require("../controllers/schoolController");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", createSchool);
router.get("/", getSchools);
router.get("/:id", checkToken, getSchoolById);
router.patch("/:id", checkToken, updateSchool);
router.delete("/:id", checkToken, deleteSchool);
router.post("/login", login);

module.exports = router;