import './OverallExercisesPage.css';
import React, { Component } from 'react'
import greentick from '../status_greentick.png';
import handslogo from '../hands_w_hearts_logo.png'
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


export class OverallExercisesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [
        { Status: 'completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'not completed', Title: 'Medisave Balance', Difficulty: 'Medium', Category: 'Medisave', Review: '' },
        { Status: 'not completed', Title: 'Withdrawing from Retirement Fund', Difficulty: 'Hard', Category: 'Retirement', Review: '' },
        { Status: 'not completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'not completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'not completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'not completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'not completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' },
        { Status: 'not completed', Title: 'Help with Medisave', Difficulty: 'Easy', Category: 'Medisave', Review: '' }
      ]
    }
  }

  renderTableData() {
    return this.state.exercises.map((exercises, index) => {
      const { Status, Title, Difficulty, Category, Review } = exercises;
      let DifficultyColor = '';
      if (Difficulty === 'Easy') {
        DifficultyColor = '#2EAE4B';
      } else if (Difficulty === 'Medium') {
        DifficultyColor = '#F0CC4B';
      } else if (Difficulty === 'Hard') {
        DifficultyColor = '#AE2E2E';
      }
      return (
        <tr key={Status} style={{ height: '67px' }}>
          <td>{Status === 'completed' ? <img src={greentick} alt="completed" /> : null}</td>
          <td>{index + 1}. {Title}</td>
          <td style={{ color: DifficultyColor }}>{Difficulty}</td>
          <td>{Category}</td>
          <td>{Review}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.exercises[0])
    return header.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  render() {
    return (
      <div className='page'>
        <div className='navwrapper'>
            <Navbar />
        </div>
        <div className='bodywrapper'>
          <h1 id='title'> <img src={handslogo} alt="handslogo" /> Retirement Scheme Training</h1>
          <table id='exercises'>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
