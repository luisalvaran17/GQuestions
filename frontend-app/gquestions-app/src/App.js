import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './containers/Login';
import { Register } from './containers/Register';
import { RegisterWithGoogle } from './components/login/RegisterWithGoogle';
import { ModalRegister } from './components/login/ModalRegister';
import { Homepage } from './containers/Homepage';
import { GenerateConfig } from './components/teacher/GenerateConfig';
import { PrivateRouteDocente } from './containers/PrivateRoutes/PrivateRouteDocente';
import { PrivateRouteEstudiante } from './containers/PrivateRoutes/PrivateRouteEstudiante';
import { PrivateRouteUser } from './containers/PrivateRoutes/PrivateRouteUser';
/* import { PrivateRouteUser } from './containers/PrivateRoutes/PrivateRouteUser'; */ //todo: quitar
import { Dashboard } from './components/teacher/Dashboard';
import { Estadisticas } from './components/teacher/Estadisticas';
import { AjustesTeacher } from './components/teacher/AjustesTeacher';
import { ErrorNotServer } from './containers/ErrorNotServer';
import { ExamenConfiguracion } from './components/teacher/ExamenConfiguracion';
import { ExamenPublicado } from './components/teacher/ExamenPublicado';
import { VisualizacionGeneracion } from './components/teacher/VisualizacionGeneracion';
import { Calificaciones } from './components/teacher/Calificaciones';
import { LoginExamen } from './components/student/LoginExamen';
import { AjustesStudent } from './components/student/AjustesStudent';
import { HomeStudent } from './components/student/HomeStudent';
import { Examen } from './components/student/Examen';
import { MisCalificaciones } from './components/student/MisCalificaciones';
import { AjustesCuentaStudent } from './components/student/user/AjustesCuentaStudent';
import { AjustesCuentaTeacher } from './components/teacher/user/AjustesCuentaTeacher';
import { RevisionExamen } from './containers/RevisionExamen';

export const App = () => {

    return (
      <BrowserRouter>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/google' component={RegisterWithGoogle} />
        <Route exact path='/register/modal' component={ModalRegister} />
        <Route exact path='/' component={Homepage} />

        {/* Rutas Docente */}
        <PrivateRouteDocente exact path='/teacher/generacion' component={GenerateConfig} />
        <PrivateRouteDocente exact path='/teacher/dashboard' component={Dashboard} />
        <PrivateRouteDocente exact path='/teacher/estadisticas' component={Estadisticas} />
        <PrivateRouteDocente exact path='/teacher/ajustes' component={AjustesTeacher} />
        <PrivateRouteDocente exact path='/teacher/examen-configuracion' component={ExamenConfiguracion} />
        <PrivateRouteDocente exact path='/teacher/examen-publicado' component={ExamenPublicado} />
        <PrivateRouteDocente exact path='/teacher/visualizar-generacion' component={VisualizacionGeneracion} />
        <PrivateRouteDocente exact path='/teacher/calificaciones' component={Calificaciones} />
        <PrivateRouteDocente exact path='/teacher/ajustes-cuenta' component={AjustesCuentaTeacher} />
        
        {/* Rutas Estudiante */}
        <PrivateRouteEstudiante exact path='/student/home' component={HomeStudent} />
        <PrivateRouteEstudiante exact path='/student/login-examen/:id' component={LoginExamen} />
        <PrivateRouteEstudiante exact path='/student/ajustes' component={AjustesStudent} />
        <PrivateRouteEstudiante exact path='/student/ajustes-cuenta' component={AjustesCuentaStudent} />
        <PrivateRouteEstudiante exact path='/student/examen' component={Examen} />
        <PrivateRouteEstudiante exact path='/student/calificaciones' component={MisCalificaciones} />

        {/* Rutas genericas */}
        <PrivateRouteUser exact path='/user/revision-examen' component={RevisionExamen} />
        <Route exact path='/not-server' component={ErrorNotServer} />
      </BrowserRouter>
    );
  }


