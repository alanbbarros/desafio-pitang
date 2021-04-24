import React from 'react';
import { Link } from 'react-router-dom';
import List from '../../components/List';
import NavBar from '../../components/NavBar'


const index = () =>{
    return(
        <div>
            <NavBar />
            <List />
        </div>
    )
}

export default index;