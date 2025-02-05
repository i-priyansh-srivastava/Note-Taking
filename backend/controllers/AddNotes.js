const Note = require("../model/notesModel");

const AddNotes = async (req, res) => {
  try {
    console.log("request received");
    
    console.log(req.body);
    const { Title, content } = req.body; 
    
    console.log(Title);
    

    if (!Title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      Title,
      content,
      createdAt: new Date(),
    });

    await newNote.save();
    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Error adding note", error: error.message });
  }
};

module.exports = { AddNotes };
