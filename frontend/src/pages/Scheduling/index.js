import React from 'react';
import Formulario from '../../components/Formulario';
import { Link } from 'react-router-dom';
import '../../App.css'

const index = () =>{
    return(
        <div>
            <Formulario />
            <Link to ='/nurse' >teste</Link>
        </div>
    )
}

export default index;