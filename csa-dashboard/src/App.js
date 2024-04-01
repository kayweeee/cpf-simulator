
import React, { Component } from 'react';
import cpf_image from '../public/cpf_image.png'; // Import your CPF image
import { FaUser } from 'react-icons/fa';
import './App.css';
import Link from 'next/link';
import Topnavbar from './components/Topnavbar.js';
import Bottomnavbar from './components/Bottomnavbar.js';

// Routing
export const App = () => {
  return (
    <div>
      <Topnavbar loginstate={false} />
      <div className="container">
        <div className="middle-section">
          <form>
            <h1 style={{ marginTop: '-150px' }}>Log In</h1>
            <p style={{ marginBottom: '5px', fontSize: '13px' }}>Employee ID or Email</p>
            <div className="icon-input">

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your Employee ID or Email"

              />
            </div>
            {/* Todo: js function to submit username for routing*/}
            <button type="submit" id={'login'}>Login</button>
          </form>
        </div>
      </div>
      <Bottomnavbar />
    </div>
  );
}

export default App;
