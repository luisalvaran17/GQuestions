import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import RegisterWithGoogle from './components/login/RegisterWithGoogle';
import ModalRegister from './components/login/ModalRegister';
import Homepage from './containers/Homepage';
import HomeTeacher from './components/teacher/Generate';
import {PrivateRoute} from './containers/PrivateRoute';
import DashboardTeacher from './components/teacher/Dashboard';
import EstadisticasTeacher from './components/teacher/Estadisticas';
import AjustesTeacher from './components/teacher/Ajustes';
import NotServer from './components/error_not_server';

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
        <PrivateRoute exact path='/teacher/home' component={HomeTeacher} />
        <PrivateRoute exact path='/teacher/dashboard' component={DashboardTeacher} />
        <PrivateRoute exact path='/teacher/estadisticas' component={EstadisticasTeacher} />
        <PrivateRoute exact path='/teacher/ajustes' component={AjustesTeacher} />
        <Route exact path='/not-server' component={NotServer} />
    </BrowserRouter>
    );
  }
}

