import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import PrivateRoute from "PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/edit-user"
        element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-history"
        element={
          <PrivateRoute>
            <UserVerificationHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      />
      {/* Redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);
