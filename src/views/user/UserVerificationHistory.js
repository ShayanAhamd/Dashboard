import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { db, auth } from "config/FirebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import Loader from "components/common/Loader";
import { signOut } from "firebase/auth";

function UserVerificationHistory() {
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserCodes();
    }
  }, [userId]);

  const fetchUserCodes = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const q = query(collection(db, "codes"), where("used_by", "==", userId));
      const querySnapshot = await getDocs(q);
      const fetchedCodes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCodes(fetchedCodes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching codes:", error);
      toast.error("Failed to fetch codes.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleVerifyCode = async () => {
    if (!code) {
      toast.error("Please enter a code.");
      return;
    }
    setLoading(true);

    try {
      const q = query(collection(db, "codes"), where("code", "==", code));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Invalid code. Please enter a valid code.");
        setLoading(false);
        return;
      }

      const docSnapshot = querySnapshot.docs[0];
      const codeData = docSnapshot.data();

      // Check if the code is already used
      if (codeData.is_used) {
        toast.error("This code has already been used.");
        setLoading(false);
        return;
      }

      // Check if the code status is true
      if (!codeData.status) {
        toast.error("This code is inactive and cannot be used.");
        setLoading(false);
        return;
      }

      if (!userId) {
        toast.error("User not authenticated.");
        setLoading(false);
        return;
      }

      // Update the code with is_used and used_by fields
      const codeRef = doc(db, "codes", docSnapshot.id);
      await updateDoc(codeRef, {
        is_used: true,
        used_by: userId,
        used_at: new Date(),
      });

      toast.success("Code verified successfully!");
      fetchUserCodes(); // Refresh the list of codes
      setCode("");
      setShowModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Error verifying code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to log out.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Loader loading={loading} />
      <div className="container-fluid pt-3 is-cable-bg">
        <br />
        <div className="row px-4 py-3 d-center">
          <div className="col-8 bg-transparent d-space-between">
            <h3 style={{ fontWeight: "bolder" }}>Verification History</h3>
            <div>
              <Button
                variant="default"
                className="btn-fill btn-sm"
                style={{ marginRight: 8 }}
                onClick={handleShow}
              >
                Add Code
              </Button>
              <Link
                to="/edit-user"
                className="btn text-white"
                style={{
                  fontSize: 12,
                  border: "none",
                  backgroundColor: "rgb(26 54 93)",
                }}
              >
                Profile
              </Link>
              <Link
                onClick={handleLogout}
                className="btn text-white"
                style={{
                  fontSize: 12,
                  border: "none",
                  marginLeft: 10,
                  backgroundColor: "#000",
                  border: "1px solid #000",
                }}
              >
                Logout
              </Link>
            </div>
          </div>
          <div className="col-8 bg-transparent d-space-between">
            <Container fluid>
              <Row>
                <Col md="12" className="px-0">
                  <Card className="strpied-tabled-with-hover">
                    <Card.Body className="table-full-width table-responsive px-0">
                      <Table className="table-hover table-striped">
                        <thead>
                          <tr>
                            <th className="border-0 pl-4">Date</th>
                            <th className="border-0 pl-4">Code</th>
                            <th className="border-0">Status</th>
                            <th className="border-0">Points</th>
                          </tr>
                        </thead>
                        {codes.length > 0 ? (
                          <tbody>
                            {codes.map((entry) => (
                              <tr key={entry.id}>
                                <td className="pl-4">
                                  {new Date(
                                    entry.used_at.seconds * 1000
                                  ).toLocaleString()}
                                </td>
                                <td className="pl-4">{entry.code}</td>
                                <td className="text-success">
                                  {entry.is_used ? "Verified" : "No"}
                                </td>
                                <td>{entry.points}</td>
                              </tr>
                            ))}
                          </tbody>
                        ) : (
                          <thead>
                            <tr>
                              <td colSpan="4" className="text-center">
                                No codes available
                              </td>
                            </tr>
                          </thead>
                        )}
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Enter Code</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleVerifyCode}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserVerificationHistory;
