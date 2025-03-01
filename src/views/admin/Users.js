import { db } from "config/FirebaseConfig";
import Loader from "components/common/Loader";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersCollection = await getDocs(collection(db, "users"));
      const usersList = usersCollection.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => !user.is_admin);

      setUsers(usersList);
      setFilteredUsers(usersList);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(results);
  };

  return (
    <>
      <Loader loading={loading} />
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="striped-tabled-with-hover">
              <div className="d-space-between">
                <Card.Header>
                  <Card.Title as="h4">Users List</Card.Title>
                  <p className="card-category">Number of registered users</p>
                </Card.Header>
                <Card.Header>
                  <Form.Group className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                      variant="danger"
                      className="btn-fill pull-right py-1"
                      onClick={handleSearch}
                    >
                      <i className="fa fa-search text-white"></i>
                    </Button>
                  </Form.Group>
                </Card.Header>
              </div>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">CNIC</th>
                      <th className="border-0">City</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">Phone Number</th>
                      <th className="border-0">Dealer Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.cnic || "N/A"}</td>
                          <td>{user.city}</td>
                          <td>{user.address}</td>
                          <td>{user.phone}</td>
                          <td>{user.dealerName || "N/A"}</td>
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
    </>
  );
}

export default Users;
