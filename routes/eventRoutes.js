const { Router } = require("express");
const { createEvent, updateEvent, deleteEvent} = require("../controllers/eventController.js");
const router = require("express").Router();

router.post("/event", createEvent);
router.patch("/:cdEvento", updateEvent);
router.delete("/:cdEvento", deleteEvent);

module.exports = router;