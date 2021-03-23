import React from "react";
import { BrowserRouter, Route , Link} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";


const App = () => (
  <BrowserRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
  </BrowserRouter>
);

export default App;