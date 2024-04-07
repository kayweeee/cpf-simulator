import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Navbar.css';
import { Link } from 'react-router-dom';
import * as MatIcons from '@mui/icons-material';
import cpf_image from '../cpf_image.png';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            selected: 0,
        }
    }
    NavbarData = [
        {
            title: 'My Profile',
            path: '/personal',
            icon: <MatIcons.PersonOutlined fontSize='large' style={{ color: 'white' }} />,
            cName: 'nav-icon'
        },
        {
            title: 'Exercises',
            path: '/overallexercises',
            icon: <MatIcons.Assessment fontSize='large' style={{ color: 'white' }} />,
            cName: 'nav-icon'
        },
    ]

    handleMouseIn() {
        this.setState({ hover: true })
        console.log('in')
    }

    handleMouseOut() {
        this.setState({ hover: false })
        console.log('out')
    }

    render() {
        return (
            <>
                <nav className='nav-menu'>
                    <div className='header'>
                        <img src={cpf_image} alt="CPF Image" className="cpf-image" width="80" height="80" />
                    </div>
                    <ul>
                        {this.NavbarData.map((item, index) => {
                            return (
                                <li>
                                    <div key={index} className="tooltip_element" onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                                        <Link to={item.path} className='tooltip_image'>{item.icon}</Link>
                                        <div className="tooltip">
                                            <Triangle className="triangle" w={20} h={35} direction='left' color='#E9E9E9' />
                                            <div className='rectangle'>
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='footer'>
                        <div className="tooltip_element" onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                            <Link to='/'><MatIcons.Logout fontSize='large' style={{ color: 'white' }} /></Link>
                            <div className="tooltip">
                                <Triangle className="triangle" w={20} h={35} direction='left' color='#E9E9E9' />
                                <div className='rectangle'>
                                    Logout
                                </div>
                            </div>
                        </div>

                    </div>


                </nav>
            </>
        )
    }

}

const Triangle = ({ w = '20', h = '20', direction = 'right', color = '#44a6e8' }) => {
    const points = {
        top: [`${w / 2},0`, `0,${h}`, `${w},${h}`],
        right: [`0,0`, `0,${h}`, `${w},${h / 2}`],
        bottom: [`0,0`, `${w},0`, `${w / 2},${h}`],
        left: [`${w},0`, `${w},${h}`, `0,${h / 2}`],
    }

    return (
        <svg width={w} height={h}>
            <polygon points={points[direction].join(' ')} fill={color} />
            Sorry, your browser does not support inline SVG.
        </svg>
    )
}