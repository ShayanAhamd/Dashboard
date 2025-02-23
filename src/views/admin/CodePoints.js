import React from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";

function CodePoints() {
  return (
    <>
      <Container fluid>
        <h3 className="mt-0">QR Generator Types</h3>
        <Row>
          <Col lg="6" sm="12">
            <Card className="card-stats hover-effect px-3">
              <Card.Body>
                <Row>
                  <Col xs="9">
                    <div className="numbers">
                      <p className="card-category text-warning text-start">
                        Basic QR Generator
                      </p>
                      <Card.Title className="text-start" as="h4">
                        50
                      </Card.Title>
                    </div>
                  </Col>
                  <Col xs="3">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-qrcode text-warning"></i>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">Generate standard QR codes</div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="6" sm="12">
            <Card className="card-stats hover-effect px-3">
              <Card.Body>
                <Row>
                  <Col xs="9">
                    <div className="numbers">
                      <p className="card-category text-primary text-start">
                        Premium QR Generator
                      </p>
                      <Card.Title className="text-start" as="h4">
                        100
                      </Card.Title>
                    </div>
                  </Col>
                  <Col xs="3">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-qrcode text-danger"></i>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Generate advanced QR codes with customization
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
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
                      <th className="border-0">User Name</th>
                      <th className="border-0">Total Points</th>
                      <th className="border-0">QR Codes Genrated</th>
                      <th className="border-0">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>23</td>
                      <td>20</td>
                      <td>2021-02-25</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Job hit</td>
                      <td>18</td>
                      <td>92</td>
                      <td>2023-09-15</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Jade sit</td>
                      <td>08</td>
                      <td>52</td>
                      <td>2025-02-05</td>
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

export default CodePoints;
