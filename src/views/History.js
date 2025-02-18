import React from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";

function history() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Verification History</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Code</th>
                      <th className="border-0">Verification Date</th>
                      <th className="border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>ABC123</td>
                      <td>2024-02-20</td>
                      <td>Verified</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Jane Smith</td>
                      <td>XYZ098</td>
                      <td>2021-02-25</td>
                      <td>Pending</td>
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

export default history;
