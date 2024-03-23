import React from 'react';
import './SchemesPage.css';
import case_scenario from '../case_scenario.png';
import retirement from '../retirement.png';
import housing from '../housing.png';
import medisave from '../medisave.png';
import progress45 from '../progress45.png';
import progress20 from '../progress20.png';
import progress50 from '../progress50.png';

export function SchemesPage() {
  return (
    <div className='page-container'>
      <header className='header'>
        <h1>Schemes</h1>
      </header>
      <div className='schemes-page'>
        <div className='card'>
          <div className='card-body'>
            <img src={retirement} alt='...' className='card-image' />
            <div className='card-text-container'>
              <h2 className='card-title'>Retirement</h2>
              <div className='card-text'>
                <p>
                  <img src={case_scenario} alt='...' className='card-image-small' />
                  Case Scenarios: 11
                </p>
              </div>
              <button className="card-button">Start Course</button>
              <div className="progress-container">
                <span className="progress-text">Progress</span>
                <img src={progress45} alt="Progress" className="progress-image" />
                </div>
            </div>
          </div>
        </div>

        <div className='card'>
            <div className='card-body'>
                <img src={housing} alt='...' className='card-image' />
                <div className='card-text-container'>
                    <h2 className='card-title'>Housing</h2>
                    <div className='card-text'>
                        <p>
                            <img src={case_scenario} alt='...' className='card-image-small' />
                            Case Scenarios: 6
                        </p>
                    </div>
                    <button className="card-button">Start Course</button>
                    <div className="progress-container">
                        <span className="progress-text">Progress</span>
                        <img src={progress20} alt="Progress" className="progress-image" />
                    </div>
                </div>
            </div>
        </div>


        <div className='card'>
            <div className='card-body'>
            <img src={medisave} alt='...' className='card-image' />
            <div className='card-text-container'>
                <h2 className='card-title'>Medisave</h2>
                <div className='card-text'>
                <p>
                <img src={case_scenario} alt='...' className='card-image-small' />
                    Case Scenarios: 8
                    </p>
                </div>
                <button className="card-button">Start Course</button>
                <div className="progress-container">
                        <span className="progress-text">Progress</span>
                        <img src={progress50} alt="Progress" className="progress-image" />
                    </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}