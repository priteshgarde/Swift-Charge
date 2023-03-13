import React, { useState } from "react";
import Email from "../ForgotPasswordComp/Email";
import OTP from "../ForgotPasswordComp/OTP";
import ResetPassword from "../ForgotPasswordComp/ResetPassword";

function ForgotPassword() {
  const [switchComp, setswitchComp] = useState({
    email: true,
    otp: false,
    reset: false,
  });

  return (
    <>
      {switchComp.email && <Email setswitchComp={setswitchComp} />}
      {switchComp.otp && <OTP setswitchComp={setswitchComp} />}
      {switchComp.reset && <ResetPassword setswitchComp={setswitchComp} />}
    </>
  );
}

export default ForgotPassword;
