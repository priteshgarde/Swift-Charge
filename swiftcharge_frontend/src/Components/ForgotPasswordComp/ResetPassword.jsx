import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
function ResetPassword({ setswitchComp }) {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mandatory")
      .min(6, "Password must be at 6 char long"),
    confirmPwd: Yup.string()
      .required("Confirm Password is mandatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    setswitchComp((prev) => ({ ...prev, otp: false, reset: true }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)} className="col-8">
          <h2>Reset Password</h2>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPwd"
              type="password"
              {...register("confirmPwd")}
              className={`form-control ${
                errors.confirmPwd ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
