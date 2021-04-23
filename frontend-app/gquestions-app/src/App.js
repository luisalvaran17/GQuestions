import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './containers/Login';
import {Register} from './containers/Register';
import {RegisterWithGoogle} from './components/login/RegisterWithGoogle';
import ModalRegister from './components/login/ModalRegister';
import {Homepage} from './containers/Homepage';
import HomeTeacher from './components/teacher/Generate';
import {PrivateRoute} from './containers/PrivateRoute';
import DashboardTeacher from './components/teacher/Dashboard';
import EstadisticasTeacher from './components/teacher/Estadisticas';
import AjustesTeacher from './components/teacher/Ajustes';
import {ErrorNotServer} from './containers/ErrorNotServer';
import ExamenConfiguracion from './components/teacher/ExamenConfiguracion';
import ExamenPublicado from './components/teacher/ExamenPublicado';
import RevisionTextos from './components/teacher/RevisionTextos';
import RevisionPreguntas from './components/teacher/RevisionPreguntas';
import LoginExamen from './components/student/LoginExamen';
import AjustesCuenta from './components/user/AjustesCuenta';

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {value:""}
}

  render() {
    return (
      <BrowserRouter>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/google' component={RegisterWithGoogle} />
        <Route exact path='/register/modal' component={ModalRegister} />
        <Route exact path='/' component={Homepage} />

        {/* Rutas Docente */}
        <PrivateRoute exact path='/teacher/home' component={HomeTeacher} />
        <PrivateRoute exact path='/teacher/dashboard' component={DashboardTeacher} />
        <PrivateRoute exact path='/teacher/estadisticas' component={EstadisticasTeacher} />
        <PrivateRoute exact path='/teacher/ajustes' component={AjustesTeacher} />
        <PrivateRoute exact path='/teacher/examen-configuracion' component={ExamenConfiguracion} />
        <PrivateRoute exact path='/teacher/examen-publicado' component={ExamenPublicado} />
        <PrivateRoute exact path='/teacher/revision-textos' component={RevisionTextos} />
        <PrivateRoute exact path='/teacher/revision-preguntas' component={RevisionPreguntas} />

        {/* Rutas Estudiante */}
        <PrivateRoute exact path='/student/login-examen' component={LoginExamen} />

        {/* Rutas genericas */}
        <PrivateRoute exact path='/user/ajustes-cuenta' component={AjustesCuenta} />
        <Route exact path='/not-server' component={ErrorNotServer} />
    </BrowserRouter>
    );
  }
}

