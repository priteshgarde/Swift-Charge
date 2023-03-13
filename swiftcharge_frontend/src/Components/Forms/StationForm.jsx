import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StationForm = ({ register, handleSubmit, errors, reset, trigger }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const submitRequest = async (data) => {
    data.user = user;
    data.user.role.id = 2;
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8080/addStation",
        data
      );
      user.station = response.data;
      user.role = { id: 2, role: "station owner" };
      localStorage.setItem("user", JSON.stringify(user));
      alert("station added");
      navigate("/mystation");
    } catch (error) {
      alert(error.response.data);
    }
  };
  const [requestData, setRequestData] = useState({});
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        height: "100vh",
      }}
    >
      <div
        className=" d-flex align-items-center flex-column justify-content-center "
        style={{ height: "100vh" }}
      >
        <form
          // onSubmit={handleSubmit(onsubmit)}
          onSubmit={handleSubmit(submitRequest)}
          action=""
          className="  p-2 "
          style={{
            width: "100%",
            backgroundColor: "whitesmoke",
            border: "10px solid white",
            borderRadius: "10px",
          }}
        >
          <h3 className="text-dark text-center p-2">Station Registration</h3>
          <div className="text-muted">Registration Number</div>
          <div className="form-group">
            <input
              className={`form-control my-1  ${
                errors.registrationNumber && "invalid"
              }`}
              style={{
                // width: "400px",
                borderRadius: "5px",
                height: "45px",
                border: "2px solid black",
              }}
              type="text"
              value={requestData.registrationNumber}
              onBeforeInputCapturech
              name="registrationNumber"
              placeholder="Registration Number"
              {...register("registrationNumber", {
                required: "Registration Number Required",

                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only Numbers are allowed",
                },
                minLength: {
                  value: 10,
                  message: "Station Registration Number is Minimum 10 Digits",
                },
                maxLength: {
                  value: 15,
                  message: "Station Registration Number is Maximum 15 Digits",
                },
              })}
            />
            {errors.registrationNumber && (
              <small className="text-danger fs-6 p-1">
                {errors.registrationNumber.message}
              </small>
            )}
          </div>
          <div className="text-muted">Total Points</div>
          <div className="form-group">
            {/* <div className="fs-5 text-light fw-bold my-1">User Id</div> */}
            <input
              className={`form-control   ${errors.totalPoints && "invalid"}`}
              style={{
                // width: "400px",
                borderRadius: "5px",
                height: "45px",
                border: "2px solid black",
              }}
              type="number"
              name="totalPoints"
              value={requestData.totalPoints}
              placeholder="Total Points"
              {...register("totalPoints", {
                required: "Total Points Required",
                pattern: {
                  value: /^[0-9]{1,2}$/,
                  message: "Only Numbers are allowed",
                },
                max: {
                  value: 99,
                  message: "Maximum 99 Points are allowed",
                },
                min: {
                  value: 1,
                  message: "Minimum 1 Point is required",
                },
              })}
            />
            {errors.totalPoints && (
              <small className="text-danger fs-6 p-1">
                {errors.totalPoints.message}{" "}
              </small>
            )}
          </div>
          <div className="text-muted">Latitude</div>
          <div className="form-group">
            {/* latitude*/}
            <input
              disabled={true}
              className={`form-control my-1 ${errors.latitude && "invalid"}`}
              style={{
                // width: "300px",
                borderRadius: "5px",
                height: "45px",
                // width: "400px",
                border: "2px solid black",
              }}
              type="text"
              name="latitude"
              placeholder="latitude"
              {...register("latitude", {
                required: "latitude is Required",
                pattern: {
                  value: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/,
                  message: "Please Enter Valid Lattitude",
                },
              })}
            />
            {errors.latitude && (
              <small className="text-danger fs-6 p-1">
                {errors.latitude.message}
              </small>
            )}
          </div>
          <div className="text-muted">Longitude</div>
          <div className="form-group">
            {/* Longitude*/}
            <input
              disabled={true}
              className={`form-control my-1  ${errors.longitude && "invalid"}`}
              style={{
                borderRadius: "5px",
                height: "45px",
                // width: "400px",
                border: "2px solid black",
              }}
              type="text"
              name="longitude"
              placeholder="Longitude"
              {...register("longitude", {
                required: "Longitude is Required",
                pattern: {
                  value: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/,
                  message: "Please Enter Valid Longitude",
                },
              })}
            />
            {errors.longitude && (
              <small className="text-danger fs-6 p-1">
                {errors.longitude.message}
              </small>
            )}
          </div>
          <div className="text-muted">Station Name</div>
          <div className="form-group">
            {/* <div className="fs-5 text-light fw-bold my-1">Name</div> */}
            <input
              className={`form-control   ${errors.stationName && "invalid"}`}
              style={{
                borderRadius: "5px",
                height: "45px",
                border: "2px solid black",
              }}
              type="text"
              name="stationName"
              value={requestData.stationName}
              placeholder="Station Name"
              {...register("stationName", {
                required: "Station Name is Required",
                minLength: {
                  value: 10,
                  message: "Station name contains minimum 10 character",
                },
                maxLength: {
                  value: 30,
                  message: "Station name contains maximum 30 character",
                },
              })}
            />
            {errors.stationName && (
              <small className="text-danger fs-6 p-1">
                {errors.stationName.message}
              </small>
            )}
          </div>
          <button
            className="btn btn-dark  my-2"
            style={{
              width: "80%",
              borderRadius: "5px",
              height: "45px",
            }}
          >
            Request For Station
          </button>
        </form>
      </div>
    </div>
  );
};

export default StationForm;
