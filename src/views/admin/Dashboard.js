import React from "react";
// import ChartistGraph from "react-chartist";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card
              className="card-stats hover-effect"
              style={{
                background: "linear-gradient(135deg, #fceabb, #f8b500)",
                color: "#fff",
              }}
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Users</p>
                      <Card.Title as="h4">150</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">Active Registered Users</div>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card
              className="card-stats hover-effect"
              style={{
                background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
                color: "#fff",
              }}
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-badge text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">New Signups</p>
                      <Card.Title as="h4">1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">Users joined this week</div>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card
              className="card-stats hover-effect"
              style={{
                background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
                color: "#fff",
              }}
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-check-2 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Verifications</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">Total verifications completed</div>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card
              className="card-stats hover-effect"
              style={{
                background: "linear-gradient(135deg, #f093fb, #f5576c)",
                color: "#fff",
              }}
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-globe text-white"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Active Sessions</p>
                      <Card.Title as="h4">45</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">Currently active users</div>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users</Card.Title>
                <p className="card-category">Users Registered</p>
              </Card.Header>
              <Card.Body>
                {/* <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                  </div> */}
                <div className="d-center">no data found</div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Users
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Recent Activity</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        {/* <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Use the points to get the rewards that are created by
                          IS Cables & Fans admin
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td> */}
                      </tr>
                      <div className="d-center">no data found</div>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
