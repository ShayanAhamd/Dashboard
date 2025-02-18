import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Users() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
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
                      <th className="border-0">Phone Number</th>
                      <th className="border-0">Dealer Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>dakotarice@gmail.com</td>
                      <td>12345-1234567-1</td>
                      <td>+921234567890</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>minerva.hooper@example.com</td>
                      <td>54321-7654321-2</td>
                      <td>+921112223344</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>sage.rodriguez@example.com</td>
                      <td>67890-1234567-3</td>
                      <td>+923001112233</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>philip.chaney@example.com</td>
                      <td>09876-5432109-4</td>
                      <td>+923445556677</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>doris.greene@example.com</td>
                      <td>11223-4455667-5</td>
                      <td>+924567890123</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>mason.porter@example.com</td>
                      <td>33445-6677889-6</td>
                      <td>+925678901234</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Jon Snow</td>
                      <td>jon.snow@example.com</td>
                      <td>55667-8899001-7</td>
                      <td>+926789012345</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Emma Watson</td>
                      <td>emma.watson@example.com</td>
                      <td>77889-0011223-8</td>
                      <td>+927890123456</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Chris Evans</td>
                      <td>chris.evans@example.com</td>
                      <td>99001-2233445-9</td>
                      <td>+928901234567</td>
                      <td>Dealer</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Scarlett Johansson</td>
                      <td>scarlett.j@example.com</td>
                      <td>11223-4455667-0</td>
                      <td>+929012345678</td>
                      <td>Dealer</td>
                    </tr>
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
