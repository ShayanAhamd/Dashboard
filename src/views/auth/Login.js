import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "config/FirebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Loader from "components/common/Loader";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      toast.error("Both email and password are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user details from Firestore
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        toast.error("User not found. Please contact support.");
        setLoading(false);
        return;
      }

      const userData = userDoc.data();

      if (userData.is_admin) {
        toast.error("Admins cannot log in from this portal.");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(userData));

      toast.success("Login Successful!");

      setTimeout(() => {
        if (location.pathname === "/admin-login") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-history");
        }
      }, 1000);
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <ToastContainer />
      <div className="container-fluid pt-5 is-cable-bg">
        <br />
        <div className="row px-4 py-3 d-center mt-3">
          <div
            className="col-md-4 col-12 border bg-white shadow"
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
              Login to your account
            </h4>
            <br />

            <form
              autoComplete="off"
              className="form-group"
              onSubmit={handleLogin}
            >
              <input
                required
                type="email"
                value={email}
                disabled={loading}
                className="form-control"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                required
                type="password"
                value={password}
                disabled={loading}
                placeholder="Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                type="submit"
                disabled={loading}
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

            {location.pathname !== "/admin-login" && (
              <span
                className="d-center pb-3 pt-1"
                style={{ color: "#1a365d", fontSize: 13, whiteSpace: "nowrap" }}
              >
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
