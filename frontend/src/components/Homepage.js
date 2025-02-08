import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { Mic, Search, Plus, X, Trash } from "lucide-react";
import "../styles/Homepage.css";

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [Title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/allNotes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addNote = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/newNote", { Title, content });
      setNotes([...notes, response.data.note]);
      setShowPopup(false);
      setTitle("");
      setcontent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/delNote/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter((n) =>
    n.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <aside className="nav-section">
        <h1>AI Notes</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Favourites</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="search-bar">
          <input placeholder="Search" className="search-input" onChange={handleSearch} />
          <button className="search-button">
            <Search size={18} />
          </button>
        </div>

        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <section key={note._id} className="note-card">
              <div className="each-note">
                <p className="note-time">{note.createdAt}</p>
                <h2 className="note-title">{note.Title}</h2>
                <p className="note-content">{note.content}</p>
                <button className="delete-button" onClick={() => deleteNote(note._id)}>
                  <Trash size={18} />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>

      <div className="add-note-button-container">
        <button className="add-note-button" onClick={() => setShowPopup(true)}>
          <Plus size={18} /> Add New Note
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h2>Add New Note</h2>
              <button className="close-button" onClick={() => setShowPopup(false)}>
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter note title"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              className="popup-input"
            />
            <textarea
              placeholder="Enter note content"
              value={content}
              onChange={(e) => setcontent(e.target.value)}
            />
            <div className="record-section">
              <button className="record-button" onClick={toggleRecording}>
                <Mic size={18} />
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>
            </div>
            <button className="save-button" onClick={addNote}>
              Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
