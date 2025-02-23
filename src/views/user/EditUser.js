// import { Navbar } from "./Navbar";
import { Link, useHistory } from "react-router-dom";
// import { auth, db } from "../Config/Config";
import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";

function EditUser() {
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
      <div className="container-fluid pt-5 is-cable-bg">
        <div className="row px-4 py-3 d-center mt-3">
          <div className="col-4 border bg-white shadow rounded">
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
              Edit Your Profile
            </h4>
            <form autoComplete="off" className="form-group">
              <input
                required
                type="text"
                value={name}
                placeholder="Full Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                required
                disabled
                type="email"
                value={cnic}
                maxLength={13}
                className="form-control"
                placeholder="Email"
                onChange={(e) => setCnic(e.target.value)}
              />
              <br />
              <input
                required
                disabled
                type="text"
                value={cnic}
                maxLength={13}
                className="form-control"
                placeholder="CNIC"
                onChange={(e) => setCnic(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Phone Number"
              />
              <br />
              <input
                required
                type="text"
                value={dealerName}
                placeholder="Dealer Name"
                className="form-control"
                onChange={(e) => setDealerName(e.target.value)}
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

export default EditUser;
