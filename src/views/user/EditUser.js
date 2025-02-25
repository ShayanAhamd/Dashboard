import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { db, auth } from "config/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Loader from "components/common/Loader";

function EditUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [dealerName, setDealerName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.name || "");
          setEmail(userData.email || "");
          setCnic(userData.cnic || "");
          setPhone(userData.phone || "");
          setDealerName(userData.dealerName || "");
          setCity(userData.city || "");
          setAddress(userData.address || "");
        } else {
          toast.error("User data not found.");
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !phone || !dealerName || !city || !address) {
      toast.error("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          name,
          phone,
          dealerName,
          city,
          address,
        });
        toast.success("Profile updated successfully!");
        setTimeout(() => navigate("/user-history"), 2000);
      }
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
      console.error("Update Error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Loader loading={loading} />
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
                    type="text"
                    value={name}
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    disabled
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
                    disabled
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">City</label>
                  <input
                    type="text"
                    value={city}
                    className="form-control"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label className="mb-0 mt-2">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <label className="mb-0 mt-2">Dealer Name</label>
              <input
                type="text"
                value={dealerName}
                className="form-control"
                onChange={(e) => setDealerName(e.target.value)}
                required
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
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
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
