// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create-rule" element={<CreateRule />} />
                        <Route path="/combine-rules" element={<CombineRules />} />
                        <Route path="/evaluate-rule" element={<EvaluateRule />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
