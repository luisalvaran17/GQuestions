import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ValidationDataDocente = async() => {
  // id rol docente -> "72eea687168b8c450afdeefa69c9d478b9ca90bfdcda1efb0029c9352ae4c70d";
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
      if (json[0].rol !== "Docente") {
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


