import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';
import Radialgraph from '../components/Radialgraph.js';
import './profile.css';
import Head from 'next/head';
import { piepercentage } from '../components/utils/helpers.js';
// import JSTable from "../components/jstable.min.js";

export default function ProfilePage() {
    // let myTable = new JSTable("#basic");

    return (
        <>
            <Head>
                <link rel="stylesheet" type="text/css" href="../components/jstable.css"></link>
                <script type="text/javascript" src="../components/jstable.min.js"></script>
            </Head>
            {/* <div className='page-container' onLoad={piepercentage([['Accuracy', 20], ["Detail", 50], ["Conciseness", 80], ["Conciseness", 100]])}> */}
            <div className='page-container'>
                <Topnavbar />
                <div className='profile-page'>
                    <div className='continue-progress'>
                        <span>Next up: Retirement Scenario 5</span>
                        <div className='continue-progress-link'>
                            <button type="button" className='button'>Continue Course {'>'}</button>
                        </div>
                    </div >
                    <div className='content'>
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
                            <div>
                                <canvas id="myChart"></canvas>
                                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                            </div>
                        </div>
                        <div className="content">
                            <h3 className='label'>Past Exercises</h3>
                            <table id="basic">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Time Completed</th>
                                        <th>Transcript</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Retirement: Scenario 5</td>
                                        <td>Jan 25, 2024 01:32 PM</td>
                                        <td>Review</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Bottomnavbar />
            </div>

        </>

    )
}