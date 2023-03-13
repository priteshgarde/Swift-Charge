import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import StationForm from "../Forms/StationForm";
import StationMap from "../StationComp/StationMap";
import { Navigate } from "react-router-dom";
import axios from "axios";

const MyStation = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const stationDetails = user?.station;
  const [details, setdetails] = useState();

  async function getDetails() {
    const res = await axios.get(
      `http://localhost:8080/getAllStationBookings/${user.station.id}`
    );
    setdetails(res.data);
  }

  useEffect(() => {
    getDetails();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
  } = useForm();
  return (
    <Container fluid>
      {!user && <Navigate to="/login" />}
      {!user?.station && (
        <Row style={{ width: "100vw", height: "90vh" }}>
          <Col xs={8} md={4}>
            <StationForm
              {...{
                register,
                handleSubmit,
                errors,
                reset,
                trigger,
              }}
            />
          </Col>
          <Col xs={4} md={8}>
            <StationMap {...{ setValue }} />
          </Col>
        </Row>
      )}
      {user?.station && (
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <Card style={{ width: "700px" }}>
              <Card.Header className="fs-4 text-center bg-dark text-light">
                Station Details
              </Card.Header>
              <Card.Body
                className="fs-5"
                style={{
                  background: "linear-gradient(rgba(200,0,0,0.5),transparent)",
                }}
              >
                <Card.Text>
                  Station Name : {stationDetails.stationName}
                </Card.Text>
                <Card.Text>Station Id : {stationDetails.id}</Card.Text>
                <Card.Text>
                  Registration Number : {stationDetails.registrationNumber}
                </Card.Text>
                <Card.Text>Lattitude : {stationDetails.latitude}</Card.Text>
                <Card.Text>Longitude : {stationDetails.longitude}</Card.Text>
                <Card.Text>
                  Total Charging Points : {stationDetails.totalPoints}
                </Card.Text>
                <Card.Text>
                  Station Approval :{" "}
                  {stationDetails.approved ? "Approved" : "Approval Pending"}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="text-center mt-2">
            <Table striped bordered hover>
              {/* //id, vehicle number, point id, starttime, end time */}
              <thead className="bg-dark text-light">
                <tr>
                  <th>Booking Id</th>
                  <th>Vehicle Number</th>
                  <th>Point Id</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {details?.map((item) => (
                  <tr style={{ borderBottom: "1px solid black" }}>
                    <td>{item.id}</td>
                    <td>{item.vehicle.vehicleNumber}</td>
                    <td>{item.point.id}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MyStation;
