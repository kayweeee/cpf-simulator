import React, { Component } from 'react';
import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';
import Loginbar from '../components/Loginbar.js'
import { Login } from '@mui/icons-material';
export class TestingPage extends Component {
  render() {
    return (
      <div>
         <Loginbar/>
         <Bottomnavbar />
    
      </div>
    );
  }
}

export default TestingPage;