import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";
import moment from "moment";
import axios from "axios";

function StationSearchBox({
  vehicles,
  viewState,
  setStations,
  bookingDto,
  setBookingDto,
}) {
  console.log(vehicles);
  const [bookingDetails, setBookingDetails] = useState({
    startTime: ceilHrs(new Date()),
    endTime: ceilHrs(moment(new Date()).add(1, "hour").toDate()),
  });
  const [error, setError] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevValue) => ({ ...prevValue, [name]: value }));
    console.log(typeof bookingDetails.startTime);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // bookingDetails.vehicle = { id: bookingDetails.VehicleId };
    console.log(bookingDetails);
    if (!bookingDetails.VehicleId) {
      setError("Please select vehicle");
      return;
    }
    setError();
    setBookingDto({
      ...bookingDetails,
      vehicle: { id: bookingDetails.VehicleId },
      lattitude: viewState.latitude,
      longitude: viewState.longitude,
    });
    console.log(bookingDto);
    const { data } = await axios.post("http://localhost:8080/availablePoints", {
      ...bookingDetails,
      vehicle: { id: bookingDetails.VehicleId },
      lattitude: viewState.latitude,
      longitude: viewState.longitude,
    });
    console.log(data);
    setStations(data);
  };
  function ceilHrs(date) {
    date.setHours(date.getHours() + Math.ceil(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

    return moment(date).format("YYYY-MM-DDTkk:mm");
  }
  return (
    <>
      <form
        action=""
        className="container-fluid bg-secondary p-3 overflow"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="row">
          <div className="text-light ">{error}</div>
          <div className="form-group col-3 ">
            <select
              className="form-control"
              name="VehicleId"
              id="VehicleId"
              defaultValue={""}
              value={bookingDetails?.vehicleId}
              onChange={(e) => handleChange(e)}
            >
              <option value="" disabled>
                Select Vehicle
              </option>
              {vehicles?.map((vehicle) => (
                <option value={vehicle.id} key={vehicle.id}>
                  {vehicle.vehicleNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-3">
            <input
              className="form-control"
              id="startTime"
              type="datetime-local"
              name="startTime"
              value={bookingDetails?.startTime}
              // step={3600}
              // min={ceilHrs(new Date())}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-group col-3">
            {" "}
            <input
              className="form-control"
              id="endTime"
              type="datetime-local"
              name="endTime"
              value={bookingDetails?.endTime}
              // step={3600}
              // min={ceilHrs(
              //   moment(bookingDetails.startTime).add(1, "hour").toDate()
              // )}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <button className="btn btn-primary col-2">Search</button>
        </div>
      </form>
    </>
  );
}

export default StationSearchBox;
