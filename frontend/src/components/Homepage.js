import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { CardContent } from "../components/CardContent";
import { Mic, Search, Plus, X } from "lucide-react";
import "../styles/Homepage.css";

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [Title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

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
      console.log("request sending");
      
      const response = await axios.post("http://localhost:5000/api/v1/newNote", {
        Title:Title,
        content:content,
      });

      console.log("request sent");
      

      setNotes([...notes, response.data.note]);
      setShowPopup(false);
      setTitle(""); 
      setcontent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

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
          <Input placeholder="Search" className="search-input" />
          <Button className="search-button">
            <Search size={18} />
          </Button>
        </div>

        <div className="notes-grid">
          {notes.map((note) => (
            <Card key={note._id} className="note-card"> {/* Fixed: Using `note._id` */}
              <CardContent>
                <p className="note-time">{note.createdAt}</p>
                <h2 className="note-title">{note.Title}</h2>
                <p className="note-content">{note.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <div className="add-note-button-container">
        <Button className="add-note-button" onClick={() => setShowPopup(true)}>
          <Plus size={18} /> Add New Note
        </Button>
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
            <Input
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
              <Button className="record-button" onClick={toggleRecording}>
                <Mic size={18} />
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            </div>
            <Button className="save-button" onClick={addNote}>
              Save Note
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
