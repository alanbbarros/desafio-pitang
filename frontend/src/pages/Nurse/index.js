import React from 'react';
import { Link } from 'react-router-dom';
import List from '../../components/List';


const index = () =>{
    return(
        <div>
            <h1>pagina do enfermeiro</h1>
            <List />
            <Link to='/' >Back Home</Link>

        </div>
    )
}

export default index;