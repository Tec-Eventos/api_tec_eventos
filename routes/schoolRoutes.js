
const { Router } = require("express");
const { createSchool, getSchoolById, getSchools, updateSchool, getAllEventsSchoolDo, deleteSchool, login } = require("../controllers/schoolController");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/escola", createSchool);
router.get("/escola", getSchools);
router.get("/escola/events/:cdEscolar", getAllEventsSchoolDo);
router.get("/escola/:cdEscolar", getSchoolById);
router.patch("/escola/:cdEscolar", checkToken, updateSchool);
router.delete("/escola/:cdEscolar", checkToken, deleteSchool);
router.post("/loginEscola", login);

module.exports = router;