import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';
import React, { Component } from 'react';
import './exercisepage.css';
import '../global.css';
import Link from 'next/link';
import backbutton from '../../public/back_button.png';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Questionbar from '../components/Questionbar.js';
import Submitbar from '../components/Submitbar.js';

export default function ExercisePage() {
  async function onClick(event) {
    event.preventDefault()

    let url = "/review"
    window.location.href = url;
  }

  return (
    <div className='page-container'>
      <Topnavbar loginstate={true}/>
      <Questionbar progress={2} />
      <div className="titles">
        <titles>Help with Retirement</titles>
      </div>
      <div className="greenBox">
        <div className="profileContainer">
          <Avatar className="avatar" sx={{ width: 'auto', height: 'auto', marginTop: '-80px', marginRight: '10px' }}>
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

      <Submitbar onClick={onClick} review={false}/>
      <Bottomnavbar />
    </div>
  );
}