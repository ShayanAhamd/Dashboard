import { db } from "config/FirebaseConfig";
import Loader from "components/common/Loader";
import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

function History() {
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const codesSnapshot = await getDocs(collection(db, "codes"));
        const codes = codesSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((code) => code.is_used && code.used_by);

        const userData = {};

        await Promise.all(
          codes.map(async (code) => {
            if (!userData[code.used_by]) {
              const userRef = doc(db, "users", code.used_by);
              const userSnap = await getDoc(userRef);
              userData[code.used_by] = userSnap.exists()
                ? userSnap.data().name || "Unknown User"
                : "Unknown User";
            }
          })
        );

        const formattedHistory = codes.map((code, index) => ({
          id: index + 1,
          name: userData[code.used_by] || "Unknown User",
          code: code.code,
          verificationDate: code.used_at?.seconds
            ? new Date(code.used_at.seconds * 1000).toLocaleDateString()
            : "N/A",
          status: "Verified",
        }));
        setHistoryData(formattedHistory);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <Loader loading={loading} />
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
                    {historyData.length > 0 ? (
                      historyData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.code}</td>
                          <td>{item.verificationDate}</td>
                          <td>{item.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No verification history found
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

export default History;
