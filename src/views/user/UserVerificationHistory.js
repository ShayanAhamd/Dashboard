// import { auth } from "../Config/Config";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";

function UserVerificationHistory() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const login = (e) => {
  //   e.preventDefault();
  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       setEmail("");
  //       setPassword("");
  //       setError("");
  //       toast.success("Login Successfully");
  //       setTimeout(() => props.history.push("/"), 3000);
  //     })
  //     .catch((err) => {
  //       try {
  //         const errorMessage =
  //           JSON.parse(err.message)?.error?.message || "An error occurred";
  //         setError(
  //           errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
  //         );
  //         toast.error(
  //           errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
  //         );
  //       } catch (error) {
  //         console.log("Error parsing the error message:", error);
  //         setError("An unexpected error occurred");
  //       }
  //     });
  // };

  return (
    <>
      {/* {user?.isAdmin && <Navbar user={user} />} */}
      {/* <ToastContainer /> */}
      <div className="container-fluid pt-3 is-cable-bg">
        <br />
        <div className="row px-4 py-3 d-center">
          <div className="col-8 bg-transparent d-space-between">
            <h3 style={{ fontWeight: "bolder" }}>Verification History</h3>
            <Link
              to="/edit-user"
              type="submit"
              className="btn btn btn-primary text-white"
              style={{
                fontSize: 12,
                border: "none",
                backgroundColor: "rgb(26 54 93)",
              }}
            >
              Profile
            </Link>
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
                        <tbody>
                          <tr>
                            <td className="pl-4">2024-02-20</td>
                            <td>ABC123</td>
                            <td className="text-success">Verified</td>
                            <td className="pl-4">23</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserVerificationHistory;
