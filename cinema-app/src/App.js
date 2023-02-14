import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import React from 'react';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>

    <Route path = "/" element={
      <React.Fragment> 
      </React.Fragment>
    }></Route>

      <Route path = "/login" element={
          <React.Fragment>
            <Login/>
          </React.Fragment>
      }></Route>
    </Routes>

    </Router>
  );
}

export default App;
