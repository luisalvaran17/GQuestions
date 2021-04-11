import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Login from '../components/login/Login'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? 
      (
        <Component {...props} />
      ) : (
        <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
        }}/>
      )
    }
  />
);

export default PrivateRoute;
