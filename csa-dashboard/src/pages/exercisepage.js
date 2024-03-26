import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';
import Loginbar from '../components/Loginbar.js'
import { Login } from '@mui/icons-material';
import React, { Component } from 'react';
import './exercisepage.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

export class exercisepage extends Component {
  render() {
    return (
      <div >
        <Topnavbar />
        <div className="greenFlexBox" style={{ backgroundColor: '#E6EDED' }}>
          <div className="backText">
            <ChevronLeft style={{ verticalAlign: 'middle' }} /> Back
            <div className="nextQuestion"> Question 1</div>
            <div className="graphContainer">
              <div className="graph">
                <div className="node"></div>
                <div className="node"></div>
                <div className="node1"></div>
                <div className="node1"></div>
                <div className="node1"></div>
                <div className="node1"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="titles">
          <titles>Help with Retirement</titles>
          </div>
          <div className="greenBox">
  <div className="profileContainer">
  <Avatar className="avatar" sx={{ width: 'auto', height: 'auto',marginTop:'-80px' ,marginRight: '10px' }}> 
      <PersonIcon /> 
    </Avatar>
    
    <div className="textContainer">
      {/*dynamic with titles etc*/}
      <div className="helpText">Mdm Tan</div>
      <div className="cpfMemberText">A CPF member</div>
      <div className="dearOfficerText">Dear Officers,</div>
      <div className="textContent">
        I would like to appeal to withdraw from my Retirement account about $5000. I am aware that if I withdraw my monthly payout will be much lesser. Please kindly assist me on my appeal soonest possible.
      </div>
    </div>
  </div>
</div>


<div className="greenBox" style={{ height: '150px', overflow: 'auto' }}>
  <textarea
    placeholder="Please enter your reply here"
    style={{
      width: '100%', 
      height: '100%',
      border: 'none',
      outline: 'none',
      resize: 'none',
      padding: '10px', 
      boxSizing: 'border-box' 
    }}
  />
</div>
  
        <hr color="#ccc" />
        <div className="buttonContainer">
          <button className="previousButton"><ChevronLeft style={{ verticalAlign: 'middle' }} />Previous Question</button>
          <button className="submitButton">Submit</button>
          <button className="nextButton">Next Question<ChevronRight style={{ verticalAlign: 'middle' }} /></button>
        </div>
        <Bottomnavbar />
      </div>
    );
  }
}

export default exercisepage;