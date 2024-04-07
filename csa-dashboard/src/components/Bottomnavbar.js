import React from 'react';
import { Link } from 'react-router-dom';
import './Bottomnavbar.css';

const Bottomnavbar = () => {
  return (
    <nav className='bottom-nav-menu'>
      <div className='nav-left'>
        <span><b>CPF Board Simulator</b></span>
      </div>

      <div className='nav-right'>
        
        <ul>
          <li><b>Schemes</b></li>
          <li><Link to='/retirement'>Retirement</Link></li>
          <li><Link to='/housing'>Housing</Link></li>
          <li><Link to='/medisave'>Medisave</Link></li>
        </ul>
        <ul>
        <li><b>Products</b></li>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/schemes'>Schemes</Link></li>
          <li><Link to='/faq'>FAQ</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Bottomnavbar;
