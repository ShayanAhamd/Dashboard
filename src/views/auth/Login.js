import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const navigate = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const validateForm = () => {
    if (!email || !password) {
      toast.error("Both email and password are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.Email === email && user.Password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      toast.success("Login Successful!");
      console.log("location.pathname", location.pathname);

      // If current route is admin-login, redirect immediately
      if (location.pathname === "/admin-login") {
        setTimeout(() => navigate.push("/admin-dashboard"), 2000); // Redirect to admin dashboard
      } else {
        setIsLoggedIn(true); // Normal users need verification
      }
    } else {
      toast.error("Invalid email or password.");
    }
  };

  const handleVerification = () => {
    const correctCode = "123456"; // Simulated correct verification code

    if (verificationCode === correctCode) {
      toast.success("Verification Successful!");
      setTimeout(() => navigate.push("/user-history"), 2000);
    } else {
      toast.error("Invalid verification code. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid pt-5 is-cable-bg">
        <br />
        <div className="row px-4 py-3 d-center mt-3">
          <div
            className="col-4 border bg-white shadow"
            style={{ borderRadius: "20px" }}
          >
            <div className="d-center pt-3">
              <img
                src={require("assets/img/logo-red.png")}
                height={80}
                width={80}
                alt="Logo"
              />
            </div>
            <h4
              className="text-center pt-md-0 pt-3 mt-3 mb-0"
              style={{ fontWeight: "bolder" }}
            >
              {isLoggedIn ? "Verify Your Account" : "Login to your account"}
            </h4>
            <br />

            {!isLoggedIn ? (
              // Login Form
              <form
                autoComplete="off"
                className="form-group"
                onSubmit={handleLogin}
              >
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  required
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="form-control"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button
                  type="submit"
                  className="btn w-100 text-white"
                  style={{
                    fontSize: 12,
                    border: "none",
                    backgroundColor: "rgb(26 54 93)",
                  }}
                >
                  LOGIN
                </button>
              </form>
            ) : (
              // Verification Code Form (only for normal users)
              <div>
                <input
                  type="text"
                  value={verificationCode}
                  placeholder="Enter Verification Code"
                  className="form-control"
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <br />
                <button
                  className="btn w-100 text-white"
                  style={{
                    fontSize: 12,
                    border: "none",
                    backgroundColor: "rgb(26 54 93)",
                  }}
                  onClick={handleVerification}
                >
                  VERIFY CODE
                </button>
              </div>
            )}

            {!isLoggedIn && location.pathname !== "/admin-login" && (
              <span className="d-center pb-3" style={{ color: "#1a365d" }}>
                New to IS Cables & Fans?
                <Link className="text-dark fw-bolder" to="/signup">
                  {" "}
                  Create Account
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
