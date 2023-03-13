import React from "react";
import { MdEvStation } from "react-icons/md";
import { Marker } from "react-map-gl";

function StationMarker({ stations, zoom, setPopupInfo }) {
  console.log(typeof stations);
  return stations?.map((station) => (
    <Marker
      latitude={station.latitude}
      longitude={station.longitude}
      anchor="bottom"
      key={station.id}
      onClick={() => setPopupInfo(station)}
    >
      <MdEvStation style={{ fontSize: zoom * 3, color: "blue" }}></MdEvStation>
    </Marker>
  ));
}

export default StationMarker;
