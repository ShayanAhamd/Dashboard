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
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersLastWeek, setUsersLastWeek] = useState(0);
  const [activeSessions, setActiveSessions] = useState(0);
  const [monthlyUserData, setMonthlyUserData] = useState(Array(12).fill(0));
  const [codeStats, setCodeStats] = useState({
    totalCodes: 0,
    usedCodes: 0,
    unusedCodes: 0,
    activeCodes: 0,
    inactiveCodes: 0,
    downloadedCodes: 0,
    notDownloadedCodes: 0,
  });

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

    const fetchCodeStats = async () => {
      try {
        const codesRef = collection(db, "codes");
        const codesSnapshot = await getDocs(codesRef);
        let totalCodes = codesSnapshot.size;
        let usedCodes = 0;
        let activeCodes = 0;
        let downloadedCodes = 0;

        codesSnapshot.docs.forEach((doc) => {
          const codeData = doc.data();
          if (codeData.is_used) usedCodes += 1;
          if (codeData.status) activeCodes += 1;
          if (codeData.is_downloaded) downloadedCodes += 1;
        });

        setCodeStats({
          totalCodes,
          usedCodes,
          unusedCodes: totalCodes - usedCodes,
          activeCodes,
          inactiveCodes: totalCodes - activeCodes,
          downloadedCodes,
          notDownloadedCodes: totalCodes - downloadedCodes,
        });
      } catch (error) {
        console.error("Error fetching code stats:", error);
      }
    };

    fetchUserStats();
    fetchCodeStats();
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

  const pieChartData = {
    labels: [
      "Total Codes",
      "Used Codes",
      "Unused Codes",
      "Active Codes",
      "Inactive Codes",
      "Downloaded Codes",
      "Not Downloaded Codes",
    ],
    datasets: [
      {
        data: [
          codeStats.totalCodes,
          codeStats.usedCodes,
          codeStats.unusedCodes,
          codeStats.activeCodes,
          codeStats.inactiveCodes,
          codeStats.downloadedCodes,
          codeStats.notDownloadedCodes,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#E67E22",
          "#8E44AD",
        ],
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
          <Col lg="4" sm="6">
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

          <Col lg="4" sm="6">
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

          <Col lg="4" sm="6">
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
                      <Card.Title as="h4">{codeStats.usedCodes}</Card.Title>
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
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users</Card.Title>
                <p className="card-category">Users Registered</p>
              </Card.Header>
              <Card.Body
                className="d-center"
                style={{ maxWidth: "500px", height: 278 }}
              >
                <Bar data={chartData} options={chartOptions} />
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
              <Card.Body
                className="d-center"
                style={{ maxWidth: "500px", height: 347 }}
              >
                <Pie data={pieChartData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
