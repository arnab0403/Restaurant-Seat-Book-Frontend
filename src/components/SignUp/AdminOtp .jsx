import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { sendOtpRequest } from "../../api/api";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const email = location.state?.email;
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus the next input field
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (element, index) => {
    if (element.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the current field
      setOtp(newOtp);

      // Focus the previous input field
      if (element.target.previousSibling) {
        element.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    const result = await sendOtpRequest(email, otpValue);
    if (result.status === 200) {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-[100vw] flex justify-center items-center absolute top-0 bg-[white] text-black">
        <div className="border-[#0000001b] h-[35%] border w-[25%] p-[20px] flex flex-col justify-between rounded-2xl shadow-2xl gap-[20px]">
          <div className="border-t border-[#F49B33]"></div>
          <h1 className="text-center text-[25px] font-medium">
            Your One Time Password
          </h1>
          <div className="flex justify-center gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="border-[#00000068] border-1 rounded-[3px] h-[40px] w-[40px] text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#F49B33]"
              />
            ))}
          </div>
          <div className="border-t border-[#F49B33]"></div>
          <button
            onClick={handleSubmit}
            className="w-[100%] bg-[#2B2B2B] text-[#F49B33] h-[40px] rounded-[5px] cursor-pointer hover:opacity-90"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminOtp;
