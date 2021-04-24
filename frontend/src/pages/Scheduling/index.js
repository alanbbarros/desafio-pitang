import React, { useState } from 'react';
import Formulario from '../../components/Formulario';
import NavBar from '../../components/NavBar'
import { Link } from 'react-router-dom';
import '../../App.css'

const index = () =>{

    return(
        <div>
            <NavBar />
            <Formulario />
        </div>
    )
}

export default index;