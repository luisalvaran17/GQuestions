import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import RegisterWithGoogle from "../components/RegisterWithGoogle";
import ModalRegister from "../components/ModalRegister";
import Index from "./Index";

const App = () => (
  <BrowserRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/register/google" component={RegisterWithGoogle} />
    <Route exact path="/register/modal" component={ModalRegister} />
    <Route exact path="/Index" component={Index} />
  </BrowserRouter>
);

export default App;