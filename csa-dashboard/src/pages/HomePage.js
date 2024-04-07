import React, { Component } from 'react';
import './HomePage.css';
import cpf_image from '../cpf_image.png'; // Import your CPF image
import { FaUser } from 'react-icons/fa';

export class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="left-section">
          <div className="cpf-block">
            <img src={cpf_image} alt="CPF Image" className="cpf-image" />
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default HomePage;





