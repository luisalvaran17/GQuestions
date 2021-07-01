import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { BASE_DIR } from '../../api/BaseDirURl';
import { LogoutAPI } from '../../api/Usuario/LogoutAPI';

export const ValidationDataDocente = async() => {
  // id rol docente -> "72eea687168b8c450afdeefa69c9d478b9ca90bfdcda1efb0029c9352ae4c70d";
  let email = localStorage.getItem('email')

  await fetch(
    BASE_DIR + "api/id-user/" +
    email,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => res.json())
    .then(async(json) => {
      if (json[0].rol !== "Docente") {
        await LogoutAPI();
        localStorage.removeItem('token');
      }
    }).catch((err) => {
      return false;
    })
}

export const PrivateRouteDocente = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      ValidationDataDocente() && localStorage.getItem('token') ?
        (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
    }
  />
);


