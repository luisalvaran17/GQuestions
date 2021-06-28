import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRouteUser = ({ component: Component, ...rest }) => (

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

