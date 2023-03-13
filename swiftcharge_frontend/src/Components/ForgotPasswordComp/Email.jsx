import React from "react";
import { useForm } from "react-hook-form";

function Email({ setswitchComp }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setswitchComp((prev) => ({ ...prev, email: false, otp: true }));
  };

  const pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: true,
          pattern: pattern,
        })}
      />
      {errors.email?.type === "required" && "Email Id is required"}
      {errors.email?.type === "pattern" && "Please provide valid email Id"}

      <button>Send OTP</button>
    </form>
  );
}

export default Email;
