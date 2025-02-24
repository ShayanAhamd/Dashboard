import React from "react";
import routes from "routes.js";
import { signOut } from "firebase/auth";
import { auth } from "config/FirebaseConfig";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    const existingNode = document.getElementById("bodyClick");
    if (!existingNode) {
      document.documentElement.classList.toggle("nav-open");
      const node = document.createElement("div");
      node.id = "bodyClick";
      node.onclick = function () {
        this.parentElement.removeChild(this);
        document.documentElement.classList.toggle("nav-open");
      };
      document.body.appendChild(node);
    }
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      const fullPath =
        (routes[i].layout ? routes[i].layout : "") + routes[i].path;
      if (location.pathname === fullPath) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ms-2 ms-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand as={Link} to="/admin" className="me-2">
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/admin">
                <span className="d-lg-none ms-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Item>
              <Button variant="danger" onClick={handleLogout}>
                Log out
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
