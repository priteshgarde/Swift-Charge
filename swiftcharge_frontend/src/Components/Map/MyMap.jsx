import React, { useEffect } from "react";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import { useState } from "react";
// import Stations from "../../Test/Stations";
import StationMarker from "./StationMarker";
import { MdEvStation } from "react-icons/md";
import StationPopup from "./StationPopup";
import "bootstrap/dist/css/bootstrap.min.css";

function MyMap({ viewState, setViewState, Stations, bookingDto }) {
  const positionOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setViewState({
          ...viewState,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (error) => alert("could not locate location"),
      positionOptions
    );
  }, []);

  const [popupInfo, setPopupInfo] = useState(null);

  const ACCESS_TOKEN =
    "pk.eyJ1IjoiZGhvbmV2cnVzaGFiaDA3IiwiYSI6ImNsMWMzZDlkZDAzNjAzbHRmM3FybzVraHAifQ.-h8_rKbjWYJwV4K7E0Mrpg";

  return (
    <Map
      {...viewState}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: "100%", height: "80%" }}
      mapboxAccessToken={ACCESS_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      <GeolocateControl
        positionOptions={positionOptions}
        showAccuracyCircle={false}
      ></GeolocateControl>
      <StationMarker
        stations={Stations}
        zoom={viewState.zoom}
        setPopupInfo={setPopupInfo}
      ></StationMarker>
      {popupInfo && (
        <StationPopup
          bookingDto={bookingDto}
          station={popupInfo}
          setPopupInfo={setPopupInfo}
        ></StationPopup>
      )}
    </Map>
  );
}

export default MyMap;
