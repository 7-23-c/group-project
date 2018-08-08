// import react components
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
    if (props.isLoggedIn) {
        return (
            <Route exact path={props.path} component={props.component} />
        )
    } else {
        return (
            <Redirect to="/" />
        )
    }
}

export default PrivateRoute;