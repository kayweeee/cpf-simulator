import React from 'react';
import { Link } from 'react-router-dom';
import './Topnavbar.css';
import cpf_image from '../cpf_image.png';

export default function Topnavbar() {
  return (
    <nav className='top-nav-menu'>
      <div className='header'>
        <img src={cpf_image} alt="CPF Image" className="cpf-image" width="80" height="80" />
        <div className='nav-text'>
          Central Provident<br />Fund Board Simulator
        </div>
      </div>
      <div className='nav-links'>
        <div>
        <Link to='/personal'style={{ textDecoration: 'none', color: 'white' }} >My Profile</Link></div>
        <div><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Get Started</Link></div>
        <div><Link to='/faq' style={{ textDecoration: 'none', color: 'white' }}>FAQ</Link></div>
      </div>
      <div className='logout'>
        
      <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Logout</Link>
      </div>
    </nav>
  );
}