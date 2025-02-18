import React from "react";
import {
  Form,
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
} from "react-bootstrap";

function GenerateCode() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Generate Code</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Row>
                  <Col className="px-1 pl-5" md="10">
                    <Form.Group>
                      <Form.Control
                        placeholder="Generate code will appear here"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="px-1 pl-3 pr-5" md="2">
                    <Button
                      className="btn-fill pull-right w-100"
                      type="submit"
                      variant="info"
                    >
                      Generate
                    </Button>
                  </Col>
                  <Col className="px-5 pt-3 pl-3" md="12">
                    <Button
                      className="btn-fill pull-right w-100 px-5"
                      type="submit"
                      variant="info"
                      disabled
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
              <Card.Header>
                <Card.Title className="text-left">
                  <h4 className="mt-1 d-start">
                    <i className="nc-icon nc-bullet-list-67 text-primary pr-2"></i>
                    <span>Generated Codes</span>
                  </h4>
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  {/* <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">User Name</th>
                      <th className="border-0">Total Points</th>
                      <th className="border-0">QR Codes Genrated</th>
                      <th className="border-0">Last Updated</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {/* <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>23</td>
                      <td>20</td>
                      <td>2021-02-25</td>
                    </tr> */}
                  </tbody>
                </Table>
                <div className="d-center">
                  <span>No codes generated yet</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GenerateCode;
