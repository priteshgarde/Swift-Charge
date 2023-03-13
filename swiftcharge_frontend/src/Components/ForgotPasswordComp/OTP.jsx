import React from "react";
import { useForm } from "react-hook-form";

function OTP({ setswitchComp }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setswitchComp((prev) => ({ ...prev, otp: false, reset: true }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("otp", {
          required: true,
          pattern: /^\d+$/,
        })}
      />
      {errors.otp?.type === "required" && "OTP is required"}
      {errors.otp?.type === "pattern" && "Enter valid OTP"}

      <button>Validate</button>
    </form>
  );
}

export default OTP;
