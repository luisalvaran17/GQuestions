import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ValidationDataEstudiante = async () => {
  // id rol estudiante -> "3d8388c45fc7f48e40800ff051117af34b204bb4a29098332f504774858e49db";
  let email = localStorage.getItem('email')

  await fetch(
    "http://127.0.0.1:8000/api/id-user/" +
    email,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => res.json())
    .then((json) => {
      if (json[0].rol !== "Estudiante") {
        fetch(
          "http://localhost:8000/api/logout/",
          {
            method: "POST",
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
              "Content-Type": "application/json"
            },
          }
        ).then((data => {
          if (data.ok) {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('uuid_generacion');
            localStorage.removeItem('id_user');
            localStorage.removeItem('rol');
          }
        })).catch(err => err)
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

