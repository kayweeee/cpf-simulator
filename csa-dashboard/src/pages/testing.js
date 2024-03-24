import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';
// import Loginbar from '../components/Loginbar.js'
import { Login } from '@mui/icons-material';
import React, { Component } from 'react';
import Navbar from '../components/Navbar.js';

export class Testing extends Component {
  render() {
    return (
      <div>
        {/* <Navbar/> */}
         <Topnavbar/>
         <Bottomnavbar />
      </div>
    );
  }
}

export default Testing;