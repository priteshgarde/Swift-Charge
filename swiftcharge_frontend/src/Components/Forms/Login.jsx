import aes from "crypto-js/aes";
import { AES } from "crypto-js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import cryptoJs from "crypto-js";
import sha512 from "crypto-js/sha512";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Login = ({ user, setUser }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [credentialError, setCredentialError] = useState();
  const onSubmit = async (data) => {
    data.password = sha512(data.password, "secret-key").toString();
    console.log(data);
    console.log(localStorage.getItem("user"));
    try {
      const response = await axios.post("http://localhost:8080/login", data);
      localStorage.setItem("user", JSON.stringify(response.data));
      redirect(response.data);
      setUser(response.data);
    } catch (error) {
      setCredentialError(error.response.data);
      console.dir(error);
    }
  };

  const redirect = ({ role: { id } }) => {
    console.log(id);
    if (id == 1) navigate("/admin");
    else if (id == 2) navigate("/mystation");
    else navigate("/bookslot");
  };

  const css = `.invalid {
  border: 2px solid red !important;
}
.a:hover {
  background-color: white !important;
}`;
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        height: "100%",
      }}
    >
      {user && <Navigate to="/" />}
      <style>{css}</style>
      <div
        className="col-12  col-md-12 d-flex align-items-center justify-content-center "
        style={{ height: "100%" }}
      >
        <form
          className="d-flex  justify-content-center flex-column "
          style={{
            width: "400px",
            borderRadius: "20px",
            padding: "20px",
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3>Log in</h3>
          {credentialError && (
            <div className="text-danger">{credentialError}</div>
          )}
          <div className="form-group my-3">
            <input
              placeholder="Email or Phone"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", {
                required: true,
              })}
            />
            <div className="invalid-feedback">
              {errors.username?.type === "required" &&
                "Email Id or phone number is required"}
            </div>
          </div>
          <div className="form-group my-3">
            <input
              placeholder="Password"
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: true,
              })}
            />
            <div className="invalid-feedback">
              {" "}
              {errors.username?.type === "required" && "Password is required"}
            </div>
          </div>
          <button className="btn btn-primary my-4">Log in</button>
          <Link className="text-end" to="/signup">
            New User?
          </Link>
        </form>
      </div>{" "}
    </div>
  );
};

export default Login;
