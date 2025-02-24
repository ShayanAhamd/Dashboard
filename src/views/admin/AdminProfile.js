import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { auth, db } from "config/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import Loader from "components/common/Loader";

function AdminProfile() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [initialData, setInitialData] = useState(null); // Store original data
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        fetchAdminData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAdminData = async (uid) => {
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setAdminData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
        setInitialData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
      } else {
        toast.error("Admin data not found!");
      }
    } catch (error) {
      toast.error("Failed to fetch admin data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const isDataChanged =
    JSON.stringify(adminData) !== JSON.stringify(initialData);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(doc(db, "users", userId), {
        name: adminData.name,
        phone: adminData.phone,
      });
      setInitialData(adminData); // Update initial data after saving
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Admin Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleUpdateProfile}>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          name="name"
                          value={adminData.name}
                          onChange={handleChange}
                          placeholder="Name"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Phone Number</label>
                        <Form.Control
                          name="phone"
                          value={adminData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          value={adminData.email}
                          placeholder="Email Address"
                          type="email"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-end mt-2">
                    <Button
                      className="btn-fill pull-right btn-sm"
                      type="submit"
                      variant="info"
                      disabled={!isDataChanged || loading} // Disable button if no changes
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminProfile;
