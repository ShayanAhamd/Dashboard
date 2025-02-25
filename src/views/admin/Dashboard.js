import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { db } from "config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersLastWeek, setUsersLastWeek] = useState(0);
  const [activeSessions, setActiveSessions] = useState(0);
  const [monthlyUserData, setMonthlyUserData] = useState(Array(12).fill(0));

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        setTotalUsers(usersSnapshot.size);

        const lastWeek = moment().subtract(7, "days").toDate();
        let usersLastWeekCount = 0;

        const monthlyData = Array(12).fill(0);
        usersSnapshot.docs.forEach((doc) => {
          const userData = doc.data();
          const createdAt = userData?.created_at;

          if (createdAt) {
            let userDate;
            if (createdAt instanceof Date) {
              userDate = moment(createdAt);
            } else if (createdAt.seconds) {
              userDate = moment(new Date(createdAt.seconds * 1000));
            } else {
              userDate = moment(createdAt);
            }

            const monthIndex = userDate.month();
            monthlyData[monthIndex] += 1;

            if (userDate.isAfter(lastWeek)) {
              usersLastWeekCount += 1;
            }
          } else {
            console.warn(`User ${doc.id} has no valid 'created_at' field.`);
          }
        });

        setUsersLastWeek(usersLastWeekCount);
        setMonthlyUserData(monthlyData);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Users Registered",
        data: monthlyUserData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Monthly User Registrations",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
                      <Card.Title as="h4">{totalUsers}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">Active Registered Users</div>
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
                      <Card.Title as="h4">{usersLastWeek}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">Users joined this week</div>
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
                      <Card.Title as="h4">{activeSessions}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">Currently active users</div>
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
                <Bar data={chartData} options={chartOptions} />
                <div className="d-center text-info" style={{ fontSize: 12 }}>
                  Total Users {totalUsers}
                </div>
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
                <Card.Title as="h4">Codes</Card.Title>
              </Card.Header>
              <Card.Body>{/* <Pie /> */}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
