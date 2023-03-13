import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function HomeBody() {
  const css = `.magic:hover {
  transition: 0.5s;
  color: #f84646;
  box-shadow:  0 0 1em 1em #60f7bb;
  box-shadow:  0 0 1em 1em #60f7bb;
  transform: translateY(-0.25em);
}`;
  return (
    <Container
      fluid
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)",
        height: "100%",
      }}
      className="m-0 p-0 d-flex align-items-center justify-content-center "
    >
      <style>{css}</style>
      <Row
        className=" text-center text-light p-4 magic"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)",
          borderRadius: "5%",
        }}
      >
        <Col>
          <div className="fs-2">No More Queue, Enjoy the View !!!</div>
          <div style={{ fontSize: "4rem" }}>SwiftCharge</div>
          {/* <div className="fs-5">Fatak se Furrrr.........</div> */}
        </Col>
      </Row>
    </Container>
  );
}

export default HomeBody;
