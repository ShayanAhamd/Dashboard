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
  FormCheck,
} from "react-bootstrap";
import { exportToCSV } from "utils/genralHelper";

function GenerateCode() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [totalCodes, setTotalCodes] = useState("");
  const [codesList, setCodesList] = useState([]);
  const [points, setPoints] = useState("");

  // Load codes from local storage when the component mounts
  useEffect(() => {
    const storedCodes =
      JSON.parse(localStorage.getItem("generatedCodes")) || [];
    setCodesList(storedCodes);
  }, []);

  // Function to generate multiple random alphanumeric codes
  const handleGenerate = () => {
    const numCodes = parseInt(totalCodes, 10);

    if (isNaN(numCodes) || numCodes <= 0) {
      alert("Please enter a valid number of codes to generate.");
      return;
    }

    const newCodes = Array.from({ length: numCodes }, () =>
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );

    setGeneratedCode(newCodes.join(", ")); // Show generated codes as a comma-separated string
  };

  // Function to save generated codes to local storage
  const handleSave = () => {
    if (!generatedCode || !points) {
      alert("Please enter points before saving.");
      return;
    }

    const codesArray = generatedCode.split(", ").map((code) => ({
      code,
      points, // Store points with each code
      createdAt: new Date().toLocaleString(),
      status: "Active", // Default to Active
    }));

    const updatedCodes = [...codesArray, ...codesList];
    setCodesList(updatedCodes);
    localStorage.setItem("generatedCodes", JSON.stringify(updatedCodes));

    setGeneratedCode("");
    setTotalCodes("");
    setPoints(""); // Clear points input after saving
  };

  // Function to delete a code
  const handleDelete = (index) => {
    const updatedCodes = codesList.filter((_, i) => i !== index);
    setCodesList(updatedCodes);
    localStorage.setItem("generatedCodes", JSON.stringify(updatedCodes));
  };

  // Function to toggle the status between Active/Inactive
  const handleToggleStatus = (index) => {
    const updatedCodes = codesList.map((item, i) =>
      i === index
        ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
        : item
    );

    setCodesList(updatedCodes);
    localStorage.setItem("generatedCodes", JSON.stringify(updatedCodes));
  };

  const deleteCodes = () => {
    setGeneratedCode(""); // Clear the generated codes input
  };

  return (
    <>
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
                      onClick={deleteCodes}
                      style={{ fontSize: 10 }}
                      className="btn-fill pull-right w-100 py-1"
                    >
                      Delete Codes
                    </Button>
                  </Card.Title>
                )}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-5">
                <Row>
                  <Col className="px-1 pl-5" md="5">
                    <Form.Group>
                      <Form.Control
                        readOnly
                        type="text"
                        value={generatedCode}
                        placeholder="Generated codes will appear here"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="3">
                    <Form.Group>
                      <Form.Control
                        placeholder="Total Codes..."
                        type="number"
                        value={totalCodes}
                        onChange={(e) => setTotalCodes(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="2">
                    <Form.Group>
                      <Form.Control
                        placeholder="Points"
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)} // Update points state
                      />
                    </Form.Group>
                  </Col>
                  <Col className="px-1 pl-3 pr-5" md="2">
                    <Button
                      className="btn-fill pull-right w-100 py-1"
                      variant="info"
                      onClick={handleGenerate}
                    >
                      Generate
                    </Button>
                  </Col>
                  <Col className="pt-3 px-0" md="12">
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
                <Card.Title className="text-left">
                  <h4 className="mt-1 d-start">
                    <i className="nc-icon nc-bullet-list-67 text-primary pr-2"></i>
                    <span>Generated Codes</span>
                  </h4>
                </Card.Title>
                {codesList.length > 0 && (
                  <Card.Title className="mr-4" as="h6">
                    <Button
                      variant="success"
                      onClick={() =>
                        exportToCSV(codesList, "generated_codes.csv")
                      }
                      disabled={codesList.length === 0}
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
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codesList.length > 0 ? (
                      codesList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.code}</td>
                          <td>{item.points}</td>
                          <td>{item.createdAt}</td>
                          <td>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={item.status === "Active"}
                                onChange={() => handleToggleStatus(index)}
                              />
                              <span className="slider"></span>
                            </label>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
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
