import React from 'react';
import { Link } from 'react-router-dom';
import './Loginbar.css';
import cpf_image from '../cpf_image.png';
import { FaUser } from 'react-icons/fa';

export default function Loginbar() {
  return (
    <nav className='top-nav-menu'>
      <div className='header'>
        <img src={cpf_image} alt="CPF Image" className="cpf-image" width="80" height="80" />
        <div className='nav-text'>
          Central Provident<br />Fund Board Simulator
        </div>
      </div>
      
      <div className='login'>
      <FaUser className="avatar-icon" /> 
      <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
      </div>
    </nav>
  );
}