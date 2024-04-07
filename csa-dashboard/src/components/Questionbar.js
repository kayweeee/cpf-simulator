import React, { Component } from 'react';
import Link from 'next/link';
import "./Questionbar.css";
import backbutton from '../../public/back_button.png';

export default class Questionbar extends Component {
    render() {
        const { progress } = this.props;

        return (
            <div className="greenFlexBox" style={{ backgroundColor: '#E6EDED' }}>
                <Link href="/overallexercises">
                    <button className="button-btm">
                        <div className="back-button">
                            <img src={backbutton.src} alt="Back" className="back-img" />
                            <span className="back-text">Back</span>
                        </div>
                    </button>
                </Link>
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
        )
    }
}