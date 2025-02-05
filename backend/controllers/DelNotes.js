const Note = require("../model/notesModel");

const DelNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error: error.message });
  }
};

module.exports = { DelNotes };
