// import { auth } from "../Config/Config";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  console.log("user", user);

  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const login = (e) => {
  //   e.preventDefault();
  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       setEmail("");
  //       setPassword("");
  //       setError("");
  //       toast.success("Login Successfully");
  //       setTimeout(() => props.history.push("/"), 3000);
  //     })
  //     .catch((err) => {
  //       try {
  //         const errorMessage =
  //           JSON.parse(err.message)?.error?.message || "An error occurred";
  //         setError(
  //           errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
  //         );
  //         toast.error(
  //           errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
  //         );
  //       } catch (error) {
  //         console.log("Error parsing the error message:", error);
  //         setError("An unexpected error occurred");
  //       }
  //     });
  // };

  return (
    <>
      {/* {user?.isAdmin && <Navbar user={user} />} */}
      {/* <ToastContainer /> */}
      <div
        className="container-fluid pt-5"
        style={{
          backgroundRepeat: "round",
          backgroundSize: "cover",
          backgroundImage:
            "url(" + require("assets/img/is-background.png") + ")",
        }}
      >
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
            <form autoComplete="off" className="form-group">
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
              <Link
                to="/admin/dashboard"
                type="submit"
                className="btn w-100 text-white"
                style={{
                  fontSize: 12,
                  border: "none",
                  backgroundColor: "rgb(26 54 93)",
                }}
              >
                LOGIN
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
