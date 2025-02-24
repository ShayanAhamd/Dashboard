import { Link } from "react-router-dom";
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

function UserVerificationHistory() {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const savedCodes =
      JSON.parse(localStorage.getItem("verificationCodes")) || [];
    setCodes(savedCodes);
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSave = () => {
    const generatedCodes =
      JSON.parse(localStorage.getItem("generatedCodes")) || [];

    const isValidCode = generatedCodes.some(
      (generatedCode) => generatedCode.code === code
    );

    if (!isValidCode) {
      toast.error("Invalid code. Please enter a valid code.");
      return;
    }

    const newCode = {
      date: new Date().toISOString().split("T")[0],
      code,
      status: "Active",
      point: 0,
    };

    const updatedCodes = [...codes, newCode];
    setCodes(updatedCodes);
    localStorage.setItem("verificationCodes", JSON.stringify(updatedCodes));
    setCode("");
    setShowModal(false);
    toast.success("Code saved successfully!");
  };

  return (
    <>
      <ToastContainer />
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
                type="submit"
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
                to="/login"
                type="submit"
                className="btn text-dark"
                style={{
                  fontSize: 12,
                  border: "none",
                  marginLeft: 10,
                  backgroundColor: "red",
                  border: "1px solid black",
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
                            <th className="border-0">Code</th>
                            <th className="border-0">Status</th>
                            <th className="border-0">Point</th>
                          </tr>
                        </thead>
                        {codes.length > 0 ? (
                          <tbody>
                            {codes.map((entry, index) => (
                              <tr key={index}>
                                <td className="pl-4">{entry.date}</td>
                                <td>{entry.code}</td>
                                <td className="text-warning">{entry.status}</td>
                                <td className="pl-4">{entry.point}</td>
                              </tr>
                            ))}
                          </tbody>
                        ) : (
                          <tbody className="d-center w-100">
                            <tr>
                              <td>No codes added yet</td>
                            </tr>
                          </tbody>
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
          <Modal.Title>Add Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Add Code</Form.Label>
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
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserVerificationHistory;
