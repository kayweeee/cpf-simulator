import React, { Component } from 'react';
import Link from 'next/link';
import "./Submitbar.css";
import '../pages/exercisepage.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default class Submitbar extends Component {
    render() {
        const { onClick, review } = this.props;

        return (
            <>
                <hr color="#ccc" />
                <div className="buttonContainer">
                    <button className="previousButton"><ChevronLeft style={{ verticalAlign: 'middle' }} />Previous Question</button>
                    <button className="submitButton" onClick={onClick}>{review ? "Try Again" : "Submit"}</button>
                    <button className="nextButton">Next Question<ChevronRight style={{ verticalAlign: 'middle' }} /></button>
                </div>
            </>

        )
    }
}