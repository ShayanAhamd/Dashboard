import { db } from "config/FirebaseConfig";
import Loader from "components/common/Loader";
import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

function CodePoints() {
  const [loading, setLoading] = useState(false);
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      setLoading(true);
      try {
        const codesSnapshot = await getDocs(collection(db, "codes"));
        const codes = codesSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((code) => code.is_used && code.used_by);

        const userMap = {};

        codes.forEach((code) => {
          const userId = code.used_by;

          if (!userMap[userId]) {
            userMap[userId] = {
              totalPoints: 0,
              totalCodesUsed: 0,
              lastUsedAt: null,
            };
          }

          userMap[userId].totalPoints += code.points || 0;
          userMap[userId].totalCodesUsed += 1;

          if (
            !userMap[userId].lastUsedAt ||
            code.used_at?.seconds > userMap[userId].lastUsedAt
          ) {
            userMap[userId].lastUsedAt = code.used_at?.seconds || null;
          }
        });

        const userData = {};

        await Promise.all(
          Object.keys(userMap).map(async (userId) => {
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);
            userData[userId] = userSnap.exists()
              ? userSnap.data().name || "Unknown User"
              : "Unknown User";
          })
        );

        const formattedData = Object.keys(userMap).map((userId, index) => ({
          id: index + 1,
          name: userData[userId] || "Unknown User",
          totalPoints: userMap[userId].totalPoints,
          totalCodesUsed: userMap[userId].totalCodesUsed,
          lastUpdated: userMap[userId].lastUsedAt
            ? new Date(userMap[userId].lastUsedAt * 1000).toLocaleDateString()
            : "N/A",
        }));
        setLoading(false);
        setUserStats(formattedData);
      } catch (error) {
        console.error("Error fetching user stats:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <>
      <Loader loading={loading} />
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
                <hr />
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
                <hr />
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
                <Card.Title as="h4">User Verification Stats</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">User Name</th>
                      <th className="border-0">Total Points</th>
                      <th className="border-0">Codes Used</th>
                      <th className="border-0">Last Used At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userStats.length > 0 ? (
                      userStats.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.totalPoints}</td>
                          <td>{user.totalCodesUsed}</td>
                          <td>{user.lastUpdated}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No user verification data available
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

export default CodePoints;
