import {
  Form,
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";
import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import Swal from "sweetalert";
import { Tooltip } from "react-tooltip";
import { db } from "config/FirebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "components/common/Loader";
import { exportToCSV } from "utils/genralHelper";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function GenerateCode() {
  const itemsPerPage = 20;
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [codesList, setCodesList] = useState([]);
  const [totalCodes, setTotalCodes] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [generatedCode, setGeneratedCode] = useState("");
  const [selectedCodes, setSelectedCodes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "codes"), (snapshot) => {
      const updatedCodes = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.points - a.points);

      setCodesList(updatedCodes);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectCode = (id) => {
    setSelectedCodes((prev) =>
      prev.includes(id) ? prev.filter((code) => code !== id) : [...prev, id]
    );
  };

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

  const handleDeleteMultiple = async () => {
    if (selectedCodes.length === 0) {
      toast.error("No codes selected for deletion.");
      return;
    }

    swal({
      title: "Are you sure?",
      text: `You are about to delete ${selectedCodes.length} selected codes. This action cannot be undone!`,
      icon: "warning",
      buttons: ["Cancel", "Yes, delete them!"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          setLoading(true);
          await Promise.all(
            selectedCodes.map((id) => deleteDoc(doc(db, "codes", id)))
          );
          toast.success("Selected codes deleted successfully!");
          setSelectedCodes([]);
        } catch (error) {
          console.error("Error deleting multiple codes:", error);
          toast.error("Failed to delete selected codes.");
        } finally {
          setLoading(false);
        }
      }
    });
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
      is_used: false,
      used_by: "",
      is_downloaded: false,
    }));

    try {
      setLoading(true);
      const savedCodes = [];

      for (const code of codesArray) {
        const docRef = await addDoc(collection(db, "codes"), code);
        savedCodes.push({ ...code, id: docRef.id });
      }

      setCodesList((prev) => [...prev, ...savedCodes]);
      setGeneratedCode("");
      setTotalCodes("");
      setPoints("");
      toast.success("Codes saved successfully!");
      exportToCSV(savedCodes, "generated_codes.csv");
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = codesList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(codesList.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                <div className="d-flex">
                  {selectedCodes.length > 0 && (
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={handleDeleteMultiple}
                      disabled={selectedCodes.length === 0}
                    >
                      Delete Selected
                    </Button>
                  )}
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>
                        <Form.Check type="checkbox" disabled />
                      </th>
                      <th>#</th>
                      <th>Code</th>
                      <th>Points</th>
                      <th>Created At</th>
                      <th>Downloaded</th>
                      <th>Used</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            <span
                              data-tooltip-id={`used-checkbox-tooltip-${item.id}`}
                            >
                              <Form.Check
                                type="checkbox"
                                disabled={item.is_used}
                                checked={selectedCodes.includes(item.id)}
                                onChange={() => handleSelectCode(item.id)}
                              />
                            </span>
                            {item.is_used && (
                              <Tooltip
                                id={`used-checkbox-tooltip-${item.id}`}
                                place="top"
                              >
                                This code has already been used and cannot be
                                modified.
                              </Tooltip>
                            )}
                          </td>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{item.code}</td>
                          <td>{item.points}</td>
                          <td>
                            {item.created_at?.seconds
                              ? new Date(
                                  item.created_at.seconds * 1000
                                ).toLocaleString()
                              : "N/A"}
                          </td>
                          <td>{item.is_downloaded ? "Yes" : "No"}</td>
                          <td>{item.is_used ? "Yes" : "No"}</td>
                          <td>
                            <span data-tooltip-id={`status-tooltip-${item.id}`}>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={item.status}
                                  disabled={item.is_used}
                                  onChange={() =>
                                    handleToggleStatus(item.id, item.status)
                                  }
                                />
                                <span className="slider"></span>
                              </label>
                            </span>

                            <Tooltip
                              id={`status-tooltip-${item.id}`}
                              place="top"
                            >
                              {item.is_used
                                ? "This code has already been used and its status cannot be changed."
                                : ""}
                            </Tooltip>
                          </td>
                          <td>
                            <span data-tooltip-id={`delete-tooltip-${item.id}`}>
                              <Button
                                variant="danger"
                                size="sm"
                                disabled={item.is_used}
                                style={{ color: "red" }}
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </Button>
                            </span>

                            <Tooltip
                              id={`delete-tooltip-${item.id}`}
                              place="top"
                            >
                              {item.is_used
                                ? "This code has already been used and cannot be deleted."
                                : ""}
                            </Tooltip>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No codes generated yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          {/* Pagination */}
          <Pagination className="justify-content-center mt-3">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((num) => (
              <Pagination.Item
                key={num + 1}
                active={num + 1 === currentPage}
                onClick={() => handlePageChange(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Row>
      </Container>
    </>
  );
}

export default GenerateCode;
