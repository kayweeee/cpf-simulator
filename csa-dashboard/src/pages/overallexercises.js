import './overallexercises.css';
import React, { Component } from 'react';
import Link from 'next/link';
import '../global.css';
import greentick from '../../public/status_greentick.png';
import backbutton from '../../public/back_button.png';
import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';

class OverallExercises extends Component {
  constructor(props) {
    super(props);
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
    };
  }

  renderTableData() {
    return this.state.exercises.map((exercise, index) => {
      const { Status, Title, Difficulty, Category, Review } = exercise;
      let difficultyColor = '';
      if (Difficulty === 'Easy') {
        difficultyColor = '#2EAE4B';
      } else if (Difficulty === 'Medium') {
        difficultyColor = '#F0CC4B';
      } else if (Difficulty === 'Hard') {
        difficultyColor = '#AE2E2E';
      }
      return (
        <tr key={index} style={{ height: '67px' }}>
          <td>{Status === 'completed' ? <img src={greentick.src} alt="completed" /> : null}</td>
          <td>
            <Link href="/exercisepage">
              {index + 1}. {Title}
            </Link>
          </td>
          <td style={{ color: difficultyColor }}>{Difficulty}</td>
          <td>{Category}</td>
          <td>{Review}</td>
        </tr>

      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.exercises[0]);
    return header.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  }

  render() {
    return (
      <div className='page-container'>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />
        <Topnavbar loginstate={true} />
        <div class="button-container">
          <Link href="/schemes">
            <button className="button-btm">
              <div className="back-button">
                <img src={backbutton.src} alt="Back" className="back-img" />
                <span className="back-text">Back</span>
              </div>
            </button>
          </Link>
        </div>
        <div className='bodywrapper'>
          <h1 id='title'> Retirement Scheme </h1>
          <table id='exercises'>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
        <Bottomnavbar />
      </div>
    );
  }
}

export default OverallExercises;
