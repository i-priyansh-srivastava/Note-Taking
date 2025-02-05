const Note = require('../model/notesModel.js');

const AllNotes = async (req, res) => {
    try {
        const data = await Note.find({});
        res.json(data);
        console.log(data);
    } 
    catch (error) {
        res.status(500).send('Error fetching doctors data');
    }
};

module.exports = { AllNotes };
