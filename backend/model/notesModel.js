const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Notes' });

module.exports = mongoose.model("Notes", NoteSchema);;
