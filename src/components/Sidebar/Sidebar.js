import { Nav } from "react-bootstrap";
import React, { Component } from "react";
import sidebarImage from "assets/img/sidebar-bg.jpeg";
import { useLocation, NavLink } from "react-router-dom";

function Sidebar({ routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar">
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + sidebarImage + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="#" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={require("assets/img/logo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="">
            IS Cables & Fans
          </a>
        </div>
        <Nav>
          {routes
            .filter((prop) => prop.showInSidebar)
            .map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
