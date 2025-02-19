import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/css/demo.css";
import "./assets/css/animate.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";

import Login from "views/auth/Login";
import Signup from "views/auth/Signup";
import AdminLayout from "layouts/Admin.js";
import EditUser from "views/user/EditUser";
import AdminLogin from "views/auth/AdminLogin";
import UserVerificationHistory from "views/user/UserVerificationHistory";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/admin-login" exact component={AdminLogin} />
      <Route path="/edit-user" exact component={EditUser} />
      <Route path="/user-history" exact component={UserVerificationHistory} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
);
