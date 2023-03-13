import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

function Payment() {
  const { state } = useLocation();
  console.log(state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [requestData, setRequestData] = useState({});
  const navigate = useNavigate();
  const onsubmit = async (data) => {
    console.log(data);
    reset();
    try {
      const response = await axios.get(
        `http://localhost:8080/confirmBooking/${state}`
      );
      console.log(response.data);
      alert("Booking Successful");
      navigate("/");
    } catch (error) {
      alert("Uufffffff !!!! You are late");
      navigate("/bookslot");
    }
  };
  function submitRequest(e) {
    e.preventDefault();
  }
  return (
    <div
      className="container d-flex justify-content-center align-items-center ps-5 ms-5 "
      style={{ height: "100vh" }}
    >
      {!state && <Navigate to="/" />}
      <form onSubmit={handleSubmit(onsubmit)} action="">
        <div
          className="p-5"
          style={{
            borderRadius: "10px",
            backgroundColor: "whitesmoke",
          }}
        >
          <div className="text-center fs-4 ">
            <label>Payment Page</label>
          </div>

          <div>
            <label className="mb-1 fs-5">Card Holder Name</label>
            <input
              className={`form-control mb-1  ${errors.name && "invalid"}`}
              type="text"
              value={requestData.name}
              onBeforeInputCapturech
              placeholder="Name"
              name="name"
              style={{ width: "450px", border: "2px solid" }}
              {...register("name", {
                required: "Please Enter Name",
                pattern: {
                  value: /^[A-Za-z ]{5,50}$/,
                  message:
                    "Only Characters are allowed Min : 5 and Max :50 Char",
                },
              })}
              onKeyUp={() => {
                trigger("name");
              }}
            />
            {errors.name && (
              <small className="text-danger fs-6 p-1">
                {errors.name.message}
              </small>
            )}
          </div>
          <div>
            <label className="mb-1 fs-5 ">Card Number</label>
            <input
              className={`form-control mb-1 ${errors.cardno && "invalid"}`}
              type="text"
              value={requestData.cardno}
              name="cardno"
              placeholder="Valid Card Number"
              style={{ width: "450px", border: "2px solid" }}
              {...register("cardno", {
                required: "Please Enter Card 16 Digit No",
                pattern: {
                  value: /^[0-9]{16,16}$/,
                  message: "Only 16 Digit Number is allowed",
                },
              })}
              onKeyUp={() => {
                trigger("cardno");
              }}
            />
            {errors.cardno && (
              <small className="text-danger fs-6 p-1">
                {errors.cardno.message}
              </small>
            )}
          </div>
          <div className="row ">
            <div className="col-8">
              <label className="mb-1 fs-5">Expiry Date</label>
              <input
                className="form-control mb-2 fw-bold"
                type="text"
                value={requestData.expirydate}
                name="expirydate"
                placeholder="Expiry Date MM / YY"
                style={{ width: "250px", border: "2px solid" }}
                {...register("expirydate", {
                  required: "Please Enter Valid Date",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Allowed Date format MM/YY",
                  },
                })}
                onKeyUp={() => {
                  trigger("expirydate");
                }}
              />
              {errors.expirydate && (
                <small className="text-danger fs-6 p-1">
                  {errors.expirydate.message}
                </small>
              )}
            </div>

            <div className="col-2">
              {" "}
              <label className="mb-1 fs-5">CVV</label>
              <input
                className={`form-control mb-2 ${errors.cvv && "invalid"}`}
                type="password"
                name="cvv"
                value={requestData.cvv}
                placeholder="CVV"
                style={{ width: "130px", border: "2px solid" }}
                {...register("cvv", {
                  required: "Invalid",
                  pattern: {
                    value: /^[0-9]{3,3}$/,
                    message: " 3 Digit ",
                  },
                })}
                onKeyUp={() => {
                  trigger("cvv");
                }}
              />
              {errors.cvv && (
                <small className="text-danger fs-6 w-100">
                  {errors.cvv.message}
                </small>
              )}
            </div>
          </div>
          <div>
            <button className="btn btn-dark mt-2" style={{ width: "450px" }}>
              Pay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Payment;
