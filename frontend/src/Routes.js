import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Order from "./Pages/Order/Order";
import Product from "./Pages/Product/Product";
import SignUp from "./Pages/SignUp/SignUp";
import User from "./Pages/User/User";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/user" component={User} />
      </Switch>
    </Router>
  );
}

export default Routes;
