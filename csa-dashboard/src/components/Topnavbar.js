import React, { Component } from 'react';
import Link from 'next/link';
import './Topnavbar.css';
import cpf_image from '../../public/cpf_image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FaUser } from 'react-icons/fa';
import { deleteCookie, getCookie } from '../services/cookies.js';

export default class Topnavbar extends Component {

  render() {
    const { loginstate } = this.props;
    

    

    async function logout() {
      
      if (typeof document === 'undefined') {
        // during server evaluation
      } else {
        deleteCookie("name");
      }
    }

    
      return (
      <>
        <nav className='top-nav-menu'>
          <div className='header'>
            <img src={cpf_image.src} alt="CPF Image" className="cpf-image" width="80" height="80" />
            <div className='nav-text'>
              Central Provident<br />Fund Board Simulator
            </div>
          </div>
          {loginstate === true ? (
            <>
              <div className='nav-links'>
                <div key={'testing'}>
                  {console.log(`/${getCookie("name")}/profile`)}
                  {/* <Link href={`/${getCookie("name")}/profile`} style={{ textDecoration: 'none', color: 'white' }} id="/profile">My Profile</Link> */}
                </div>
                {/* <div><Link href={`/${getCookie("name")}/schemes`} style={{ textDecoration: 'none', color: 'white' }} id="/schemes">Get Started</Link></div> */}
                <div><Link href='/faq' style={{ textDecoration: 'none', color: 'white' }} id="/faq">FAQ</Link></div>
              </div><div className='logout'>
                <Link href='/' onClick={logout}>
                  Logout <FontAwesomeIcon icon={faSignOutAlt} />
                </Link>
              </div>
            </>
          )
            : (
              <div className='login'>
                <Link href='/login' style={{ textDecoration: 'none', color: 'white' }}>
                  <FaUser className="avatar-icon" />
                  Login
                </Link>
              </div>
            )}
        </nav>
      </>
    )
    }

    
  }