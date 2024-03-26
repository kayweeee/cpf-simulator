import React, { Component } from 'react';
import cpf_image from '../public/cpf_image.png'; // Import your CPF image
import { FaUser } from 'react-icons/fa';
import './App.css';
import Link from 'next/link';

// top nav
class Loginbar extends Component {
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
          Login 

        </div>
      </nav>
    );
  }
}

//bottom nav
  class Bottomnavbar extends Component {
    render(){
    return (
      <nav className='bottom-nav-menu'>
        <div className='nav-left'>
          <span><b>CPF Board Simulator</b></span>
        </div>

        <div className='nav-right'>

          <ul>
          <li style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Schemes</li>
            <li><Link href='/retirement'>Retirement</Link></li>
            <li><Link href='/housing'>Housing</Link></li>
            <li><Link href='/medisave'>Medisave</Link></li>
          </ul>
          <ul>
          <li style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Products</li>
            <li><Link href='/home'>Home</Link></li>
            <li><Link href='/schemes'>Schemes</Link></li>
            <li><Link href='/faq'>FAQ</Link></li>
          </ul>
        </div>
      </nav>
    );
  }}
// Routing
export const App = () => {
  return (
    <div>
      <Loginbar />
      <div className="container">
        <div className="middle-section">



          <form>
            <h1 style = {{marginTop:'-150px'}}>Log In</h1>
            <p style={{ marginBottom: '5px',fontSize: '13px'}}>Employee ID or Email</p>
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