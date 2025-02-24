import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user data from local storage when the component mounts
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setName(loggedInUser.Name);
      setEmail(loggedInUser.Email);
      setPassword(loggedInUser.Password);
      setCnic(loggedInUser.CNIC);
      setPhone(loggedInUser.Phone);
      setDealerName(loggedInUser.DealerName);
      setCity(loggedInUser.City || "");
      setAddress(loggedInUser.Address || "");
    }
  }, []);

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !name ||
      !email ||
      !password ||
      !cnic ||
      !phone ||
      !dealerName ||
      !city ||
      !address
    ) {
      toast.error("All fields are required.");
      return;
    }

    const updatedUserData = {
      Name: name,
      Email: email,
      Password: password,
      CNIC: cnic,
      Phone: phone,
      DealerName: dealerName,
      City: city,
      Address: address,
      is_admin: false, // Preserve existing fields
      created_at: new Date().toISOString(), // Preserve existing fields
    };

    // Update user data in local storage
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUserData));
    toast.success("Profile updated successfully!");
    setTimeout(() => navigate("/user-history"), 3000); // Redirect to profile page after update
  };

  return (
    <>
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
            <h4
              className="text-center pt-md-0 pt-3 mt-3 mb-0"
              style={{ fontWeight: "bolder" }}
            >
              Edit Your Profile
            </h4>
            <form
              autoComplete="off"
              className="form-group"
              onSubmit={handleUpdate}
            >
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
                    value={email}
                    className="form-control"
                    placeholder="Email"
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
                    className="form-control"
                    placeholder="12345-6789012-3"
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Address</label>
                  <input
                    required
                    type="text"
                    value={address}
                    placeholder="Address"
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
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
