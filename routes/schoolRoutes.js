
const { Router } = require("express");
const { createSchool, getSchoolById, getSchools, updateSchool, getAllEventsSchoolDo, deleteSchool, login } = require("../controllers/schoolController");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/escola", createSchool);
router.get("/escola", getSchools);
router.get("/escola/:cdEscolar", getAllEventsSchoolDo);
router.get("/escolaID/:cdEscolar", getSchoolById);
router.patch("/:cdEscolar", checkToken, updateSchool);
router.delete("/:cdEscolar", checkToken, deleteSchool);
router.post("/loginEscola", login);

module.exports = router;