import React from 'react';
import { Link } from 'react-router-dom';
import {Nav, Button} from 'react-bootstrap/';
import '../App.css'

const NavBar = () =>{
    return(
        <div className='navbar'>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/schedules'>Área do Enfermeiro</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;