import axios from "axios";
import { Dropdown } from "bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import premiumVehicles from "../../Test/PremiumVehicleLIst";

const AddVehicle = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const onsubmit = async (data) => {
    data.user = { id: user.id };
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:8080/addVehicle",
        data
      );
      if (!user.vehicles) user.vehicles = [];
      user.vehicles.push(response.data);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Vehicle registerd successfully, continue to slot booking");
      navigate("/bookslot");
    } catch (error) {
      alert(error.response.data);
    }
    console.log(data);
    reset();
  };

  const checkPremium = () => {
    const formData = getValues();
    const premiumVehicle = premiumVehicles.find(
      ({ vehicleNumber }) => vehicleNumber == formData.vehicleNumber
    );
    console.log(formData);
    if (premiumVehicle) {
      setValue("batteryId", premiumVehicle.batteryId);
      setValue("validity", premiumVehicle.validity);
      alert("Congratulations, your vehicle has premium access");
    } else alert("Sorry!!!, you don't have premium access");

    console.log(getValues());
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
      {!user && <Navigate to={"/login"} />}
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
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="form-group my-2">
            <select
              {...register("vehicleType", {
                required: "Please Select Vehicle type",
              })}
              defaultValue=""
              className="form-control"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="TWOWHEELER">Two Wheeler</option>
              <option value="THREEWHEELER">Three Wheeler</option>
              <option value="FOURWHEELER">Four Wheeler</option>
            </select>
            {errors.vehicleType && (
              <small className="text-danger fs-6 p-1">
                {errors.vehicleType.message}
              </small>
            )}
          </div>

          <div className="form-group my-2">
            <input
              className="form-control"
              placeholder="Vehicle Number Like MH 27 AB 4954"
              {...register("vehicleNumber", {
                required: "Please Enter Vehicle Number Like Ex.MH27 AB 4954",
                pattern: {
                  value:
                    /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/,
                  message:
                    "Please Enter valid Vehicle number Like Ex.MH 27 AB 4954",
                },
              })}
              onKeyUp={() => {
                trigger("vehicleNumber");
              }}
            />
            {errors.vehicleNumber && (
              <small className="text-danger fs-6 p-1">
                {errors.vehicleNumber.message}
              </small>
            )}
          </div>

          <div className="d-flex justify-content-between my-2">
            <button className="btn btn-primary">Register Vehicle</button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={checkPremium}
            >
              Claim Premium Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
