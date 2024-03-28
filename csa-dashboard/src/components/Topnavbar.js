import React, { Component } from 'react';
import Link from 'next/link';
import './Topnavbar.css';
import cpf_image from '../../public/cpf_image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// export default function Topnavbar() {
//   return (
//     <nav className='top-nav-menu'>
//       <div className='header'>
//         <img src={cpf_image.src} alt="CPF Image" className="cpf-image" width="80" height="80" />
//         <div className='nav-text'>
//           Central Provident<br />Fund Board Simulator
//         </div>
//       </div>
//       <div className='nav-links'>
//         <div>
//         <Link href='/personal'style={{ textDecoration: 'none', color: 'white' }} >My Profile</Link></div>
//         <div><Link href='/' style={{ textDecoration: 'none', color: 'white' }}>Get Started</Link></div>
//         <div><Link href='/faq' style={{ textDecoration: 'none', color: 'white' }}>FAQ</Link></div>
//       </div>
//       <div className='logout'>
//       <Link href='/' style={{ textDecoration: 'none', color: 'white' }}>Logout</Link>
//       </div>
//     </nav>
//   );
// }
export default class Topnavbar extends Component {
  render() {
    return (
      <>
        <nav className='top-nav-menu'>
          <div className='header'>
            <img src={cpf_image.src} alt="CPF Image" className="cpf-image" width="80" height="80" />
            <div className='nav-text'>
              Central Provident<br />Fund Board Simulator
            </div>
          </div>
          <div className='nav-links'>
            <div key={'testing'}>
              <Link href='/personal' style={{ textDecoration: 'none', color: 'white' }} >My Profile</Link>
            </div>
            <div><Link href='/' style={{ textDecoration: 'none', color: 'white' }}>Get Started</Link></div>
            <div><Link href='/faq' style={{ textDecoration: 'none', color: 'white' }}>FAQ</Link></div>
          </div>
          <div className='logout'>
            <Link href='/' >
            Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </div>
        </nav>
      </>
       )
      }
    }