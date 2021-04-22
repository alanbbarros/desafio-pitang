import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Nurse from './pages/Nurse';
import Scheduling from './pages/Scheduling'

const listOfRoutes = [{
    path:'/nurse',
    name:'nurse',
    component: Nurse,
},
{
    path:'/',
    name:'scheduling',
    component: Scheduling,
}
]

const routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                {listOfRoutes.map(route => (
                    <Route
                    path={route.path}
                    exact
                    component={route.component}
                    key={route.path}
                    />
                ))}
            </Switch>
        </BrowserRouter>
    )
}

export default routes;