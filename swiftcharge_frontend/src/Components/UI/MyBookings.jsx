import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookingDetails, setbookingDetails] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/login");
        return;
      }
      const { data } = await axios.get(
        `http://localhost:8080/getAllBookings/${user?.id}`
      );
      setbookingDetails(data);
    }
    fetchData();
  }, []);

  return (
    <div className="row ">
      {bookingDetails?.map((item) => (
        <div className="col-6 col-md-4 ">
          <Card className="mb-1" style={{ border: "4px solid blue" }}>
            <Card.Header
              className="bg-dark text-light text-center mb-1"
              style={{ height: "55px" }}
            >
              Booking Id : {item.id}
            </Card.Header>
            <Card.Body
              className="bg-light text-dark text-light mb-1 fw-bold"
              style={{
                height: "310px",
                background: "linear-gradient(#e66465, #9198e5,#e66465)",
              }}
            >
              <Card.Text>Station Name : {item.station.stationName}</Card.Text>
              <Card.Text>Latittude : {item.station.latitude}</Card.Text>
              <Card.Text>Longitude : {item.station.longitude}</Card.Text>
              <Card.Text>Point Id : {item.point.id}</Card.Text>
              <Card.Text>Start Time :{item.startTime}</Card.Text>
              <Card.Text>End Time : {item.endTime}</Card.Text>
              <Card.Text>
                Vehicle Number : {item.vehicle.vehicleNumber}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-dark text-light text-center">
              Thank You
            </Card.Footer>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
