import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
} from "react-bootstrap";
import { exportToCSV } from "utils/genralHelper";
import { db } from "config/FirebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import Loader from "components/common/Loader";

function GenerateCode() {
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [codesList, setCodesList] = useState([]);
  const [totalCodes, setTotalCodes] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "codes"), (snapshot) => {
      const updatedCodes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCodesList(updatedCodes);
    });

    return () => unsubscribe();
  }, []);

  const handleGenerate = () => {
    const numCodes = parseInt(totalCodes, 10);
    if (isNaN(numCodes)) {
      toast.error("Please enter a valid number of codes to generate.");
      return;
    }
    if (numCodes <= 0 || numCodes > 100) {
      toast.error("Number of codes must be between 1 and 100.");
      return;
    }
    if (!points || parseInt(points, 10) < 1) {
      toast.error("Points must be at least 1.");
      return;
    }

    const existingCodes = new Set(codesList.map((code) => code.code));
    const newCodes = new Set();

    while (newCodes.size < numCodes) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      if (!existingCodes.has(code)) {
        newCodes.add(code);
      }
    }

    setGeneratedCode(Array.from(newCodes).join(", "));
  };

  const handleSave = async () => {
    if (!generatedCode || !points) {
      toast.error("Please enter points before saving.");
      return;
    }

    const codesArray = generatedCode.split(", ").map((code) => ({
      code,
      points: parseInt(points, 10),
      created_at: new Date(),
      status: true,
      used: false,
      user_id: "",
    }));

    try {
      setLoading(true);
      for (const code of codesArray) {
        await addDoc(collection(db, "codes"), code);
      }
      setGeneratedCode("");
      setTotalCodes("");
      setPoints("");
      toast.success("Codes saved successfully!");
    } catch (error) {
      console.error("Error saving codes:", error);
      toast.error("Failed to save codes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "codes", id));
      toast.success("Code deleted successfully!");
    } catch (error) {
      console.error("Error deleting code:", error);
      toast.error("Failed to delete code.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "codes", id), { status: !currentStatus });
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
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
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-space-between">
                <Card.Title as="h4">Generate Code</Card.Title>
                {generatedCode && (
                  <Card.Title className="mr-4" as="h6">
                    <Button
                      variant="danger"
                      onClick={() => setGeneratedCode("")}
                      className="btn-fill pull-right w-100 py-1"
                    >
                      Delete Codes
                    </Button>
                  </Card.Title>
                )}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-5">
                <Row>
                  <Col md="5">
                    <Form.Group>
                      <Form.Control
                        readOnly
                        type="text"
                        value={generatedCode}
                        placeholder="Generated codes will appear here"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group>
                      <Form.Control
                        placeholder="Total Codes (Max 100)..."
                        type="number"
                        value={totalCodes}
                        onChange={(e) => setTotalCodes(e.target.value)}
                        min="1"
                        max="100"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2">
                    <Form.Group>
                      <Form.Control
                        placeholder="Points (Min 1)"
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        min="1"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2">
                    <Button
                      className="btn-fill pull-right w-100 py-1"
                      variant="info"
                      onClick={handleGenerate}
                    >
                      Generate
                    </Button>
                  </Col>
                  <Col md="12" className="pt-3">
                    <Button
                      className="btn-fill pull-right w-100"
                      variant="info"
                      onClick={handleSave}
                      disabled={!generatedCode}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-space-between">
                <Card.Title>
                  <h4 className="mt-1 d-start">
                    <i className="nc-icon nc-bullet-list-67 text-primary pr-2"></i>
                    <span>Generated Codes</span>
                  </h4>
                </Card.Title>
                {codesList.length > 0 && (
                  <Card.Title className="mr-4" as="h6">
                    <Button
                      variant="success"
                      onClick={() => {
                        const formattedData = codesList.map((item) => ({
                          ...item,
                          created_at: item.created_at?.seconds
                            ? new Date(
                                item.created_at.seconds * 1000
                              ).toLocaleDateString()
                            : "N/A",
                        }));
                        exportToCSV(formattedData, "generated_codes.csv");
                      }}
                    >
                      Download CSV
                    </Button>
                  </Card.Title>
                )}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Code</th>
                      <th>Points</th>
                      <th>Created At</th>
                      <th>Used</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codesList.length > 0 ? (
                      codesList.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.code}</td>
                          <td>{item.points}</td>
                          <td>
                            {new Date(
                              item.created_at.seconds * 1000
                            ).toLocaleString()}
                          </td>
                          <td>{item.used == true ? "Yes" : "No"}</td>
                          <td>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={item.status}
                                onChange={() =>
                                  handleToggleStatus(item.id, item.status)
                                }
                              />
                              <span className="slider"></span>
                            </label>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No codes generated yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GenerateCode;
