import Topnavbar from '../../components/Topnavbar.js';
import Bottomnavbar from '../../components/Bottomnavbar.js';
import Radialgraph from '../../components/Radialgraph.js';
import CustomTable from '../../components/CustomTable.js';
import './profile.css';
import '../../app/[[...slug]]/index.css';
import { piepercentage } from '../../components/utils/helpers.js';
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, BarElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import React from "react";

export default function ProfilePage() {
    // TODO: onload piechart data, bargraph data, transcript data + bookmark data

    Chart.register(CategoryScale, BarElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

    const data = {
        labels: ["Retirement", "Housing", "Medisave", "Scheme 1", "Scheme 2"],
        datasets: [
            {
                data: [76, 25, 100, 70, 12]
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            }
        },
        elements: {
            line: {
                tension: 0,
                borderWidth: 2,
            }
        },
        scales: {
            xAxis: {
                display: false,
            },
            yAxis: {
                display: false
            }
        }
    }

    return (
        <>
            {/* <div className='page-container' onLoad={piepercentage([['Accuracy', 20], ["Detail", 50], ["Conciseness", 80], ["Conciseness", 100]])}> */}
            <div className='page-container'>
                <Topnavbar loginstate={true}/>
                <div className='profile-page'>
                    <div className='continue-progress'>
                        <span>Next up: Retirement Scenario 5</span>
                        <div className='continue-progress-link'>
                            <button type="button" className='continuebutton'>Continue Course {'>'}</button>
                        </div>
                    </div >
                    <div className='pie-content'>
                        <h3 className='label'>Overall Scores</h3>
                        <div className='graphs'>
                            <div className='pie-graph'>
                                <Radialgraph id='Accuracy' />
                                <p className='pie-name'>Accuracy</p>
                            </div>
                            <div className='pie-graph'>
                                <Radialgraph id='Detail' />
                                <p className='pie-name'>Level of Detail</p>
                            </div>
                            <div className='pie-graph'>
                                <Radialgraph id='Conciseness' />
                                <p className='pie-name'>Conciseness</p>
                            </div>
                            <div className='pie-graph'>
                                <Radialgraph id='Tone' />
                                <p className='pie-name'>Tone</p>
                            </div>
                        </div>
                    </div>
                    <div className='statistics'>
                        <div className="content">
                            <h3 className='label'>Subcategory Mastery</h3>
                            <div className='mastery-graph'>
                                <Bar data={data} options={options} />
                            </div>
                        </div>
                        <div className="content">
                            <h3 className='label'>Past Exercises</h3>
                            <div className='mastery-graph'>
                                <CustomTable/>
                            </div>
                        </div>
                    </div>
                </div>
                <Bottomnavbar />
            </div>

        </>

    )
}