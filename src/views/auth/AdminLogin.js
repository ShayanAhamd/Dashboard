import { auth, db } from "config/FirebaseConfig";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Loader from "components/common/Loader";
import { toast, ToastContainer } from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.is_admin) {
          toast.success("Login successful!");
          navigate("/admin/dashboard");
        } else {
          toast.error("Access denied! You are not an admin.");
          auth.signOut();
        }
      } else {
        toast.error("User data not found.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <ToastContainer />
      <div className="container-fluid pt-5 is-cable-bg">
        <div className="row px-4 py-3 d-center mt-3">
          <div
            className="col-4 border bg-white shadow"
            style={{ borderRadius: "20px" }}
          >
            <div className="d-center pt-3">
              <img
                src={require("assets/img/logo.png")}
                height={80}
                width={80}
                alt="Logo"
              />
            </div>
            <h4
              className="text-center pt-md-0 pt-3 mt-3 mb-0"
              style={{ fontWeight: "bolder" }}
            >
              Admin Login
            </h4>
            <br />
            <form onSubmit={login} autoComplete="off" className="form-group">
              <input
                type="email"
                value={email}
                className="form-control"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                value={password}
                placeholder="Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                type="submit"
                className="btn w-100 text-white mb-3"
                style={{
                  fontSize: 12,
                  border: "none",
                  backgroundColor: "rgb(26 54 93)",
                }}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
