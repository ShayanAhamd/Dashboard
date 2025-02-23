// import { Navbar } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      <div className="container-fluid is-cable-bg">
        <div className="row px-4 py-3 d-center">
          <div
            className="col-md-7 col-12 border bg-white shadow"
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
              Edit Your Profile
            </h4>
            <form autoComplete="off" className="form-group">
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Full Name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    placeholder="Full Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Email</label>
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
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">CNIC</label>
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
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    required
                    onChange={(e) => setCnic(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Address</label>
                  <input
                    required
                    type="text"
                    value={dealerName}
                    placeholder="Dealer Name"
                    className="form-control"
                    onChange={(e) => setDealerName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="d-end">
                <button
                  type="submit"
                  className="btn w-25 text-white mb-3 mt-2"
                  style={{
                    fontSize: 12,
                    border: "none",
                    backgroundColor: "rgb(26 54 93)",
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
