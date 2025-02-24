import React, { useState } from "react";
import { auth, db } from "config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "components/common/Loader";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dealerName, setDealerName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formatCNIC = (value) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 13);
    if (numericValue.length <= 5) {
      return numericValue;
    } else if (numericValue.length <= 12) {
      return `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`;
    } else {
      return `${numericValue.slice(0, 5)}-${numericValue.slice(
        5,
        12
      )}-${numericValue.slice(12)}`;
    }
  };

  const handleCnicChange = (e) => {
    const formattedCnic = formatCNIC(e.target.value);
    setCnic(formattedCnic);
  };

  const validateForm = () => {
    if (name.length < 3) {
      toast.error("Full name must be at least 3 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    if (cnic.length !== 15) {
      toast.error(
        "CNIC must be exactly 13 digits (formatted as 12345-6789012-3)."
      );
      return false;
    }

    if (!/^\d{11}$/.test(phone)) {
      toast.error(
        "Phone number must be exactly 11 digits (e.g., 03XXXXXXXXX)."
      );
      return false;
    }

    if (dealerName.trim() === "") {
      toast.error("Dealer Name is required.");
      return false;
    }

    if (city.trim() === "") {
      toast.error("City is required.");
      return false;
    }

    if (address.trim() === "") {
      toast.error("Address is required.");
      return false;
    }

    return true;
  };

  const signup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const response = await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        cnic,
        phone,
        dealerName,
        city,
        address,
        is_admin: false,
        created_at: new Date().toISOString(),
      });

      toast.success("Signup Successful!");
      setLoading(false);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <ToastContainer />
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
            <h5 className="text-center fw-bold pt-md-0 pt-3">
              CREATE YOUR ACCOUNT
            </h5>
            <form autoComplete="off" className="form-group" onSubmit={signup}>
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    required
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">CNIC</label>
                  <input
                    type="text"
                    value={cnic}
                    className="form-control"
                    placeholder="12345-6789012-3"
                    maxLength={15}
                    required
                    onChange={handleCnicChange}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    value={phone}
                    placeholder="03XXXXXXXXX"
                  />
                </div>
              </div>
              <label className="mb-0 mt-2">Dealer Name</label>
              <input
                type="text"
                value={dealerName}
                className="form-control"
                required
                placeholder="Dealer Name"
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
            <span
              className="d-center pb-3"
              style={{ color: "#1a365d", fontSize: 13, whiteSpace: "nowrap" }}
            >
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
