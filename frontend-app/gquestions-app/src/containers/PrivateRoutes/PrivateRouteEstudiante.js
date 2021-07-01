import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { BASE_DIR } from '../../api/BaseDirURl';
import { LogoutAPI } from '../../api/Usuario/LogoutAPI';

export const ValidationDataEstudiante = async () => {
  // id rol estudiante -> "3d8388c45fc7f48e40800ff051117af34b204bb4a29098332f504774858e49db";
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
      if (json[0].rol !== "Estudiante") {
        await LogoutAPI();
        localStorage.removeItem('token');
      }
    }).catch((err) => {
      return false;
    })
}

export const PrivateRouteEstudiante = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      ValidationDataEstudiante() && localStorage.getItem('token') ?
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

