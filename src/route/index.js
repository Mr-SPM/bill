import React from 'react';
import { Route } from 'react-router-dom';
import Content from '../app/Content';
import Add from '../app/Add';
import Chart from '../app/Chart';
const routeConfig = [
    {
        path: '/',
        component: Content
    },
    {
        path: '/add',
        component: Add
    },
    {
        path: '/chart',
        component: Chart
    },
]

const RouteWithSubRoutes = (route) => (
    <Route exact path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
    )} />
)

const RouteList = () => (
    <React.Fragment>
        {
            routeConfig.map((route, index) => {
                return (
                    <RouteWithSubRoutes key={index} {...route} />
                )
            })
        }
    </React.Fragment>
);
export default RouteList;