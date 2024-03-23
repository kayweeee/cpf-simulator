import React from 'react';
import './schemes.css';
import case_scenario from '../../public/case_scenario.png';
import retirement from '../../public/retirement.png';
import housing from '../../public/housing.png';
import medisave from '../../public/medisave.png';
import progress45 from '../../public/progress45.png';
import progress20 from '../../public/progress20.png';
import progress50 from '../../public/progress50.png';

export default function SchemesPage() {
  return (
    <div className='page-container'>
      <header className='header'>
        <h1>Schemes</h1>
      </header>
      <div className='schemes-page'>
        <div className='card'>
          <div className='card-body'>
            <img src={retirement.src} alt='...' className='card-image' />
            <div className='card-text-container'>
              <h2 className='card-title'>Retirement</h2>
              <div className='card-text'>
                <p>
                  <img src={case_scenario.src} alt='...' className='card-image-small' />
                  Case Scenarios: 11
                </p>
              </div>
              <button className="card-button">Start Course</button>
              <div className="progress-container">
                <span className="progress-text">Progress</span>
                <img src={progress45.src} alt="Progress" className="progress-image" />
                </div>
            </div>
          </div>
        </div>

        <div className='card'>
            <div className='card-body'>
                <img src={housing.src} alt='...' className='card-image' />
                <div className='card-text-container'>
                    <h2 className='card-title'>Housing</h2>
                    <div className='card-text'>
                        <p>
                            <img src={case_scenario.src} alt='...' className='card-image-small' />
                            Case Scenarios: 6
                        </p>
                    </div>
                    <button className="card-button">Start Course</button>
                    <div className="progress-container">
                        <span className="progress-text">Progress</span>
                        <img src={progress20.src} alt="Progress" className="progress-image" />
                    </div>
                </div>
            </div>
        </div>


        <div className='card'>
            <div className='card-body'>
            <img src={medisave.src} alt='...' className='card-image' />
            <div className='card-text-container'>
                <h2 className='card-title'>Medisave</h2>
                <div className='card-text'>
                <p>
                <img src={case_scenario.src} alt='...' className='card-image-small' />
                    Case Scenarios: 8
                    </p>
                </div>
                <button className="card-button">Start Course</button>
                <div className="progress-container">
                        <span className="progress-text">Progress</span>
                        <img src={progress50.src} alt="Progress" className="progress-image" />
                    </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}