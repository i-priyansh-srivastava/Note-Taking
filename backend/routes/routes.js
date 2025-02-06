const express = require("express");
const router = express.Router();
const { AllNotes } = require("../controllers/AllNotes")
const { AddNotes } = require("../controllers/AddNotes")
const { DelNotes } = require("../controllers/DelNotes")

router.get('/allNotes', AllNotes);
router.post('/newNote', AddNotes);
router.delete('/delNote/:id', DelNotes)
module.exports = router;
