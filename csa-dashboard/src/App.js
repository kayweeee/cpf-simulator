import React from 'react';
import './App.css';
import './pages/schemes.css';
import './global.css';
import Link from 'next/link';
import Topnavbar from './components/Topnavbar.js';
import Bottomnavbar from './components/Bottomnavbar.js';

import landingpage from '../public/landingpage.png';
import image235 from '../public/image 235.png';
import rectangle from '../public/Rectangle.png';
import case_scenario from '../public/case_scenario.png';
import retirement from '../public/retirement.png';
import housing from '../public/housing.png';
import medisave from '../public/medisave.png';

// Routing
export const App = () => {
  return (
    <div className={'page-container'}>
      <Topnavbar loginstate={false} />
      {/* Top Container */}
      <div className={'container'}>
        <div className={'text'}>
          <h1 className={'heading'}>Start training with CPF Simulator</h1>
          <p className={'paragraph'}>Welcome to CPF Simulator! Improve your skills by engaging with real-life scenarios and boost your ability to independently respond to various enquiries across different schemes after training with us!  </p>
          <Link href="/">
            <button className="button">Let's Start</button>
          </Link>
        </div>
        <div className={'image'}>
          <img src={landingpage.src} alt="Your Image" />
        </div>
      </div>
      {/* Main Container 1 */}
      <div className={'bottom-container'}>
        {/* Container A */}
        <div className={'bottom-container-1'}>
          <div className={'left-content'}>
            <div className={'box'}>
              <h1 className={'heading2'}>Practice with Simulated Exercises</h1>
              <p className={'paragraph2'}>The simulated exercises mirror real-life scenarios you might encounter, varying in difficulty levels from easy to medium to hard. </p>
            </div>
          </div>
          <div className={'right-content'}>
            <div className={'image2-container'}>
              <img className={'image2'} src={image235.src} alt="Your Image" />
              <h1 className={'heading3'}>Gain real-time feedback on your performance</h1>
              <p className={'paragraph3'}>Upon submitting your answer, you will instantly receive a personalized feedback from our specially trained model. This feedback is tailored specifically to your response. </p>
            </div>
          </div>
        </div>
        {/* Container B */}
        <div className={'bottom-container-2'}>
          <div className="image-bottom-left">
            <img src={rectangle.src} alt="Image" />
          </div>
          <div className={'text-bottom-right'}>
            {/* Text content for container B */}
            <h1 className={'heading4'}>Download your transcripts for offline reference</h1>
            <p className={'paragraph4'}>Afraid that you will forget your review? Fret not as you can download the transcripts to revisit and review again in the future! </p>
          </div>
        </div>
      </div>
      {/* Container C */}
      <div className={'bottom-container-3'}>
        <header className='header-text'>
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
              </div>
            </div>
          </div>
        </div>
        <div class="button-container">
          <Link href="/login">
            <button className="button-btm">Login to Start Now!</button>
          </Link>
        </div>
      </div>
      <Bottomnavbar />
    </div>
  );
}

export default App;

