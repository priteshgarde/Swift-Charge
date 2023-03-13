import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(/background.jpg)`,
        backgroundSize: `cover`,
        height: "90vh",
      }}
    >
      <Row>
        <Col></Col>
      </Row>
      <Outlet />
    </Container>
  );
}

export default Home;
