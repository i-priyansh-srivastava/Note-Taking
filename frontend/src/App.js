import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

import Home from "./components/Homepage.js";
import LoginSign from './components/LoginSign.js';


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSign />} />
        <Route path="/Home" element={<Home />} />

      </Routes>
      
      <ToastContainer/>
    </Router>
  );
}

export default App;