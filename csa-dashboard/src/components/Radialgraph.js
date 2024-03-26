import React, { Component } from 'react';
import './Radialgraph.css';

export default class Radialgraph extends Component {
    render() {
        return (
            <>
                <div className="radial-graph">
                    <div className="shape">
                        <div className="mask full-mask">
                            <div className="fill"></div>
                        </div>
                        <div className="mask">
                            <div className="fill"></div>
                            <div className="fill shim"></div>
                        </div>
                    </div>
                    <div className="cutout">
                        <b className='cutout-label'>75%</b>
                    </div>
                </div>
            </>

        )
    }
}