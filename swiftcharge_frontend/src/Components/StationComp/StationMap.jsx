import React, { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { MdLocationPin } from "react-icons/md";

const StationMap = ({ setValue }) => {
  const [viewState, setViewState] = useState({
    zoom: 13,
  });
  const [marker, setMarker] = useState({});
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
        setMarker({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (error) => alert("could not locate location"),
      positionOptions
    );
  }, []);

  const ACCESS_TOKEN =
    "pk.eyJ1IjoiZGhvbmV2cnVzaGFiaDA3IiwiYSI6ImNsMWMzZDlkZDAzNjAzbHRmM3FybzVraHAifQ.-h8_rKbjWYJwV4K7E0Mrpg";
  const getCoords = ({ lngLat: { lat, lng } }) => {
    setMarker({ latitude: lat, longitude: lng });
    // console.log(lat);
    // console.log(lng);
    setValue("latitude", lat);
    setValue("longitude", lng);
  };
  return (
    <Map
      {...viewState}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: "100%", height: "100%" }}
      mapboxAccessToken={ACCESS_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      <GeolocateControl
        positionOptions={positionOptions}
        showAccuracyCircle={false}
      ></GeolocateControl>
      <Marker {...marker} draggable={true} onDragEnd={(e) => getCoords(e)}>
        <MdLocationPin style={{ fontSize: viewState.zoom * 4 }}></MdLocationPin>
      </Marker>
    </Map>
  );
};

export default StationMap;
