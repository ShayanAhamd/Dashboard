// import { Navbar } from "./Navbar";
import { Link, useHistory } from "react-router-dom";
// import { auth, db } from "../Config/Config";
import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useHistory();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((currentUser) => {
  //     setUser(currentUser ? currentUser : null);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // Signup function
  // const signup = (e) => {
  //   e.preventDefault();
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((cred) => {
  //       db.collection("SignedUpUsersData")
  //         .doc(cred.user.uid)
  //         .set({
  //           Name: name,
  //           Email: email,
  //           Password: password,
  //           CNIC: cnic,
  //           Phone: phone,
  //           DealerName: dealerName,
  //           is_admin: false,
  //           created_at: new Date(),
  //         })
  //         .then(() => {
  //           setName("");
  //           setEmail("");
  //           setPassword("");
  //           setCnic("");
  //           setPhone("");
  //           setDealerName("");
  //           setError("");
  //           toast.success("Signup Successful");
  //           setTimeout(() => navigate.push("/login"), 3000);
  //         })
  //         .catch((err) => toast.error(err.message));
  //     })
  //     .catch((err) => toast.error(err.message));
  // };

  return (
    <>
      {/* {user?.isAdmin && <Navbar user={user} />}
      <ToastContainer /> */}
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
          <div className="col-4 border bg-white shadow rounded">
            <div className="d-center pt-3">
              <img
                src={require("assets/img/logo.png")}
                height={80}
                width={80}
                alt="Logo"
              />
            </div>
            <h5 className="text-center fw-bold pt-md-0 pt-3">
              CREATE YOUR ACCOUNT
            </h5>
            <form autoComplete="off" className="form-group">
              <label className="mb-0 mt-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <label className="mb-0 mt-2" htmlFor="cnic">
                CNIC
              </label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setCnic(e.target.value)}
                value={cnic}
                maxLength={13}
                placeholder="12345-6789012-3"
              />

              <label className="mb-0 mt-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="03XX-XXXXXXX"
              />

              <label className="mb-0 mt-2" htmlFor="dealerName">
                Dealer Name
              </label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setDealerName(e.target.value)}
                value={dealerName}
              />

              <label className="mb-0 mt-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <label className="mb-0 mt-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
                SIGN UP
              </button>
            </form>
            <span className="d-center pb-3" style={{ color: "#1a365d" }}>
              Already have an account?{" "}
              <Link className="text-dark fw-bolder" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
