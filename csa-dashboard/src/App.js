import React from 'react';
import cpf_image from '../public/cpf_image.png'; // Import your CPF image
import { FaUser } from 'react-icons/fa';
import './App.css';

// Routing
export const App = () => {
    return (
        <div className="container">
          <div className="left-section">
            <div className="cpf-block">
              <img src={cpf_image.src} alt="CPF Image" className="cpf-image" />
            </div>
          </div>
          <div className="right-section">
          <form>
              <h1>Member Login</h1>
              <div className="icon-input">
                <FaUser className="icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Login ID"
                />
              </div>
              {/* Todo: js function to submit username for routing*/}
              <button type="submit" id={'login'}>Login</button>
            </form>
          </div>
        </div>
      );
}

export default App