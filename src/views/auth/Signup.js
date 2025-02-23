import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [dealerName, setDealerName] = useState("");
  const navigate = useHistory();

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

    return true;
  };

  const signup = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
      Name: name,
      Email: email,
      Password: password,
      CNIC: cnic,
      Phone: phone,
      DealerName: dealerName,
      is_admin: false,
      created_at: new Date().toISOString(),
    };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some((user) => user.Email === email);

    if (emailExists) {
      toast.error("Email already exists. Please use a different email.");
      return;
    }

    existingUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCnic("");
    setPhone("");
    setDealerName("");

    toast.success("Signup Successful");
    setTimeout(() => navigate.push("/login"), 3000);
  };

  return (
    <>
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
            <h5 className="text-center fw-bold pt-md-0 pt-3">
              CREATE YOUR ACCOUNT
            </h5>
            <form autoComplete="off" className="form-group" onSubmit={signup}>
              <label className="mb-0 mt-2">Full Name</label>
              <input
                type="text"
                value={name}
                className="form-control"
                required
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />

              <label className="mb-0 mt-2">Email</label>
              <input
                type="email"
                className="form-control"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <label className="mb-0 mt-2">Password</label>
              <input
                type="password"
                className="form-control"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <label className="mb-0 mt-2">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />

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

              <label className="mb-0 mt-2">City</label>
              <input
                type="text"
                placeholder="City"
                className="form-control"
                required
                onChange={(e) => setCnic(e.target.value)}
              />

              <label className="mb-0 mt-2">Phone Number</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                value={phone}
                placeholder="03XXXXXXXXX"
              />

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
