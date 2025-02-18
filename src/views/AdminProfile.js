import React, { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

function AdminProfile() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="px-1 pl-3" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="first"
                          placeholder="First Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Last Name</label>
                        <Form.Control
                          defaultValue="last"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue="admin@gmail.com"
                          placeholder="Email Address"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Password</label>
                        <div className="position-relative">
                          <Form.Control
                            defaultValue="test123"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                          ></Form.Control>
                          <Button
                            variant="light"
                            className="position-absolute end-0 top-50 translate-middle-y"
                            style={{
                              border: "none",
                              background: "transparent",
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeSlash /> : <Eye />}
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right d-end"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
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
