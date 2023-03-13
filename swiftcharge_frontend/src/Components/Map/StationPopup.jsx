import React from "react";
import { Popup } from "react-map-gl";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function StationPopup({ station, setPopupInfo, bookingDto }) {
  const navigate = useNavigate();
  const handleclick = async () => {
    const lockslot = { station, bookingDto };
    console.log(lockslot);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/lockslot",
        lockslot
      );
      console.log("after request");
      console.log(data);
      navigate("/payment", { state: data });
    } catch (error) {
      alert(error.response.data);
      navigate("/bookslot");
    }
  };
  return (
    <Popup
      className="card"
      anchor="bottom"
      longitude={Number(station.longitude)}
      latitude={Number(station.latitude)}
      offset={30}
      closeOnClick={false}
      onClose={() => setPopupInfo(null)}
    >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{station.stationName}</Card.Title>
        <Card.Text>Available Slots : {station.chargingPoints.length}</Card.Text>
        <Link to="/payment" state={{ station }}>
          <Button variant="primary" onClick={handleclick}>
            Book Slot
          </Button>
        </Link>
      </Card.Body>
    </Popup>
  );
}

export default StationPopup;
