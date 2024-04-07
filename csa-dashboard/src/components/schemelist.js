import React, { Component } from 'react';
import Link from 'next/link';
import "./schemelist.css";
import case_scenario from '../../public/case_scenario.png';


export default class Schemelist extends Component {
    render() {
        const { entry } = this.props;

        return (
            <div className='card'>
                <div className='card-body'>
                    <img src={entry.thumbnail} alt='...' className='card-image' />
                    <div className='card-text-container'>
                        <h2 className='card-title'>{entry.name}</h2>
                        <div className='card-text'>
                            <p>
                                <img src={case_scenario.src} alt='...' className='card-image-small' />
                                Case Scenarios: {entry.cases}
                            </p>
                        </div>
                        {entry.valid ?
                            <Link href="/overallexercises">
                                <button className="card-button">Start Course</button>
                            </Link> :
                            <button className="card-button-disabled">Start Course</button>
                        }
                        <div className="progress-container">
                            <span className="progress-text">Progress</span>
                            <img src={entry.progress} alt="Progress" className="progress-image" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}