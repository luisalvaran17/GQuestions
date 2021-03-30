import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import RegisterWithGoogle from '../components/RegisterWithGoogle';
import ModalRegister from '../components/ModalRegister';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
    <Route exact path='/register/google' component={RegisterWithGoogle} />
    <Route exact path='/register/modal' component={ModalRegister} />
    <Route exact path='/index' component={Home} />
  </BrowserRouter>
);

export default App;
