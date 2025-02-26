import { db } from "config/FirebaseConfig";
import Loader from "components/common/Loader";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";
import { Card, Table, Container, Row, Col } from "react-bootstrap";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch users.");
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
            <Card className="striped-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users List</Card.Title>
                <p className="card-category">Number of registered users</p>
              </Card.Header>
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
                    {users.length > 0 ? (
                      users.map((user, index) => (
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
