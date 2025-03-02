import { db } from "config/FirebaseConfig";
import Loader from "components/common/Loader";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
} from "react-bootstrap";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userCodes, setUserCodes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingCodes, setLoadingCodes] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersQuery = query(
        collection(db, "users"),
        where("is_admin", "==", false)
      );
      const usersSnapshot = await getDocs(usersQuery);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersList);
      setFilteredUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCodes = async (userId) => {
    setLoadingCodes(true);
    setLoading(true);
    try {
      const codesQuery = query(
        collection(db, "codes"),
        where("used_by", "==", userId)
      );
      const codesSnapshot = await getDocs(codesQuery);
      const codesList = codesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        verificationDate: doc.data().used_at?.seconds
          ? new Date(doc.data().used_at.seconds * 1000).toLocaleDateString()
          : "N/A",
      }));

      setUserCodes(codesList);
    } catch (error) {
      console.error("Error fetching user codes:", error);
      toast.error("Failed to fetch user's used codes.");
    } finally {
      setLoadingCodes(false);
      setLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    fetchUserCodes(user.id); // Fetch the user's codes when opening modal
  };

  return (
    <>
      <Loader loading={loading} />
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="striped-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title as="h4">Users List</Card.Title>
                  <p className="card-category">Number of registered users</p>
                </div>
                <Form.Group className="d-flex mb-0">
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="danger" className="btn-fill py-1">
                    <i className="fa fa-search text-white"></i>
                  </Button>
                </Form.Group>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>CNIC</th>
                      <th>City</th>
                      <th>Address</th>
                      <th>Phone Number</th>
                      <th>Dealer Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: 12 }}>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.cnic || "N/A"}</td>
                          <td>{user.city}</td>
                          <td>{user.address}</td>
                          <td>{user.phone}</td>
                          <td>{user.dealerName || "N/A"}</td>
                          <td>
                            <Button
                              variant="danger"
                              className="btn-fill py-1 px-1"
                              style={{ fontSize: 10 }}
                              onClick={() => handleView(user)}
                            >
                              View <i className="fa fa-eye text-white"></i>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No users found
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

      {/* Modal for user details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Used Codes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              {loadingCodes ? (
                <p>Loading codes...</p>
              ) : userCodes.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Code</th>
                      <th>Verification Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userCodes.map((code, index) => (
                      <tr key={code.id}>
                        <td>{index + 1}</td>
                        <td>{code.code}</td>
                        <td>{code.verificationDate}</td>
                        <td>Verified</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No codes found for this user.</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Users;
