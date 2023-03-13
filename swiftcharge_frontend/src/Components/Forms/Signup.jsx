import { useState, useEffect } from "react";
import { AES } from "crypto-js";
import { useNavigate, Navigate } from "react-router-dom";

import axios from "axios";
import sha512 from "crypto-js/sha512";

function Signup({ user, setUser }) {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    conpassword: "",
  };

  const [formErrors, setFormErrors] = useState({ x: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [otp, setOtp] = useState("");
  const [toggle, setToggle] = useState({ isSignup: true, isOtp: false });
  const [serverOtp, setServerOtp] = useState();
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      console.log(formValues);
      formValues.role = { id: 3 };
      try {
        const response = await axios.post(
          `http://localhost:8080/newUser`,
          formValues
        );
        console.log(serverOtp);
        setToggle({ isSignup: false, isOtp: true });
        setServerOtp(response.data);
      } catch (error) {
        alert(error.response.data);
      }
    }
  };
  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();
    console.log(serverOtp);
    console.log(otp);
    if (serverOtp == otp) {
      formValues.password = sha512(
        formValues.password,
        "secret-key"
      ).toString();

      axios.post(`http://localhost:8080/register`, formValues);
      alert("Registered Successfully, Please login to continue");
      navigate("/login");
    } else console.log("invalid otp");
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) console.log();
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex1 = /^[a-zA-Z ]/;
    const regex2 = /^[a-zA-Z ]{2,30}$/;
    const regex3 = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    const regex4 =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
    if (!values.name) {
      errors.name = "Name is required ";
    } else if (!regex1.test(values.name)) {
      errors.name = "Name should be charater";
    } else if (!regex2.test(values.name)) {
      errors.name =
        "Minimum 2 character and Maximum than 30 character required";
    }
    if (!values.email) {
      errors.email = "email is required Like xyz123@gmail.com";
    } else if (!regex.test(values.email)) {
      errors.email =
        "This is not a Valid Email format required Like xyz12@gmail.com";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (!regex3.test(values.phone)) {
      errors.phone = "Please enter valid 10 digit phone number";
    }
    if (!values.password) {
      errors.password = "password is required ";
    } else if (!regex4.test(values.password)) {
      errors.password = "Please enter valid password";
    }
    if (!values.conpassword) {
      errors.conpassword = "confirm password is required ";
    } else if (values.conpassword !== values.password) {
      errors.conpassword = "password is not matched ";
    }

    return errors;
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
      {user && <Navigate />}
      <style>{css}</style>
      <div
        className="col-12  col-md-12 d-flex align-items-center justify-content-center "
        style={{ height: "100%" }}
      >
        {toggle.isSignup && (
          <form
            onSubmit={handleSubmit}
            className="d-flex align-items-center justify-content-center  "
            style={{
              width: "600px",
              borderRadius: "20px",
              padding: "20px",
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
          >
            <div>
              <div>
                <h3
                  className="text-center text-dark "
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Register
                </h3>
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                  <h3 style={{color:'green'}} >
                    Registered Successfully
                  </h3>
                ) : (
                  <pre className="text-light"></pre>
                )}
                <div>
                  <input
                    className="form-control"
                    style={{
                      width: "400px",
                      borderRadius: "20px",
                      height: "50px",
                      fontWeight: "bold",
                    }}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.name}</p>
                </div>

                <div>
                  <input
                    className="form-control"
                    style={{
                      width: "400px",
                      borderRadius: "20px",
                      height: "50px",
                      fontWeight: "bold",
                    }}
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.email}</p>
                </div>

                <div>
                  <input
                    className="form-control"
                    style={{
                      width: "400px",
                      borderRadius: "20px",
                      height: "50px",
                      fontWeight: "bold",
                    }}
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formValues.phone}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.phone}</p>
                </div>

                <div>
                  <input
                    className="form-control"
                    style={{
                      width: "400px",
                      borderRadius: "20px",
                      height: "50px",
                      fontWeight: "bold",
                    }}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.password}</p>
                </div>

                <div>
                  <input
                    className="form-control"
                    style={{
                      width: "400px",
                      borderRadius: "20px",
                      height: "50px",
                      fontWeight: "bold",
                    }}
                    type="password"
                    name="conpassword"
                    placeholder="Confirm Password"
                    value={formValues.conpassword}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.conpassword}</p>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-primary m-2"
                    style={{
                      width: "400px",
                      borderRadius: "20px",
                      height: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {toggle.isOtp && (
          <form
            className="d-flex  justify-content-center flex-column "
            style={{
              width: "400px",
              borderRadius: "20px",
              padding: "20px",
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
            onSubmit={(e) => registerUser(e)}
          >
            <div className="fs-4 mb-5">
              Just to validate it's you, we have sent OTP to your email
            </div>
            <div className="form-group">
              <label className="mb-3" htmlFor="otp">
                Enter OTP
              </label>
              <input
                name="otp"
                id="otp"
                value={otp}
                className="form-control"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button className="btn btn-primary my-4">Sign up</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
