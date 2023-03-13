import React, { useState } from "react";
import StationSearchBox from "../Forms/StationSearchBox";
import MyMap from "../Map/MyMap";
import { Navigate } from "react-router-dom";

function SearchStation({ user, setUser }) {
  //setUser(JSON.parse(localStorage.getItem("user")));
  const myUser = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [viewState, setViewState] = React.useState({
    latitude: 10.9,
    longitude: 74.77,
    zoom: 13,
  });

  const [Stations, setStations] = useState([]);
  const [bookingDto, setBookingDto] = useState({});

  return (
    <div style={{ height: "100vh", widht: "100vw" }}>
      {(!myUser && <Navigate to={"/login"} />) ||
        ((!myUser.vehicles || myUser.vehicles?.length == 0) && (
          <Navigate to="/addVehicle" />
        ))}

      <StationSearchBox
        {...{
          vehicles: myUser?.vehicles,
          viewState,
          setStations,
          bookingDto,
          setBookingDto,
        }}
      />
      <MyMap {...{ viewState, setViewState, Stations, bookingDto }} />
    </div>
  );
}

export default SearchStation;
