import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import RegisterWithGoogle from './components/login/RegisterWithGoogle';
import ModalRegister from './components/login/ModalRegister';
import Homepage from './containers/Homepage';

const App = () => (
  <BrowserRouter>
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
    <Route exact path='/register/google' component={RegisterWithGoogle} />
    <Route exact path='/register/modal' component={ModalRegister} />
    <Route exact path='/' component={Homepage} />
  </BrowserRouter>
);

export default App;
