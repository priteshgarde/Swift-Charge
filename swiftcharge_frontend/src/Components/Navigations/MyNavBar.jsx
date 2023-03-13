import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

function MyNavBar({ user, setUser }) {
  const icon = <FaUserCircle className="fs-3" />;
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container fluid var>
        <Navbar.Brand href="/">SwiftCharge</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/mystation">My Station</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link href="/addVehicle">Add Vehicle</Nav.Link>
            <Nav.Link href="/mybookings">My Bookings</Nav.Link>
            <Nav.Link eventKey={2} href="/bookslot">
              Book Slot
            </Nav.Link>
            <NavDropdown
              title={icon}
              id="collasible-nav-dropdown"
              align={"end"}
            >
              {!user && (
                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
              )}
              {!user && (
                <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
              )}
              {user && (
                <>
                  <NavDropdown.Item disabled={true} className="fs-3">
                    {user.name}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={logout}>
                    Log out
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavBar;
