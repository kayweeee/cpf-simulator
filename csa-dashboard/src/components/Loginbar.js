import React, { Component } from 'react';
import { Link } from 'next/link';
import './Loginbar.css';
import cpf_image from '../../public/cpf_image.png';
import { FaUser } from 'react-icons/fa';

// function Loginbar() {
//   return (
//     <nav className='top-nav-menu'>
//       <div className='header'>
//         <img src={cpf_image.src} alt="CPF Image" className="cpf-image" width="80" height="80" />
//         <div className='nav-text'>
//           Central Provident<br />Fund Board Simulator
//         </div>
//       </div>

//       <div className='login'>
//         <FaUser className="avatar-icon" />
//         {/* <Link href="/">Login</Link> */}
//         {/* <Link href='/' style={{ textDecoration: 'none', color: 'white' }}>Login</Link> */}
//       </div>
//     </nav>
//   );
// }

export default class Loginbar extends Component {
  render() {
    return (
      <nav className='top-nav-menu'>
        <div className='header'>
          <img src={cpf_image.src} alt="CPF Image" className="cpf-image" width="80" height="80" />
          <div className='nav-text'>
            Central Provident<br />Fund Board Simulator
          </div>
        </div>

        <div className='login'>
          <FaUser className="avatar-icon" />
          {/* <Link href="/">Login</Link> */}
          {/* <Link href='/' style={{ textDecoration: 'none', color: 'white' }}>Login</Link> */}
        </div>
      </nav>
    );
  }
}