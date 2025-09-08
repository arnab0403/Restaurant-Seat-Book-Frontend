import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router";
// import {  verifyOtp } from "../../api/api";
import Error from "../SignUp/Error";
import { forgetPassword } from "../../api/api";
import Message from "../Resturants/Message";
import { LoaderCircle } from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null); // To handle errors
  const [message, setMessage] = useState(null);
  const [mailOtp, setMailOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async () => {
    console.log();
    setLoading(true);
    setOtp(true);
    // const response = await forgetPassword(userId);
    if (response.status === 200) {
      setMessage("OTP SEND SUCSESSFULLY");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      console.log("OTP SEND");
      setLoading(false);
    } else {
      setError("Wrong User ID");
    }
  };

  const handleChangePassword = async () => {
    const response = await verifyOtp(userId, mailOtp, newPassword);
    if (response.data === "Success") {
      setMessage("Password Change Sucsessfully");
      navigate("/login");
    } else {
      setError("Wrong Otp");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      {loading && (
        <div className="h-[100vh] mt-[90px] bg-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black flex flex-col items-center">
            <LoaderCircle color="#000000" className=" animate-spin" size={43} />
            <p>Sending OTP To your Email</p>
          </div>
        </div>
      )}
      <Navbar />
      {otp && !loading && (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center absolute top-0 bg-[white] text-black">
          <div className="h-[40%] border-[#0000001b] border w-[25%]  p-[20px] flex flex-col justify-between rounded-2xl shadow-2xl">
            <h1 className="text-[20px] font-bold">Verify Your OTP</h1>
            <div className="flex flex-col ">
              <label htmlFor="username">Enter OTP</label>
              <input
                type="text"
                placeholder="Your OTP"
                className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
                name="otp"
                id="otp"
                value={mailOtp}
                onChange={(e) => setMailOtp(e.target.value)}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="username">Enter New Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
                name="newpassword"
                id="newpassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              className="w-[100%] bg-[#2B2B2B] text-[#F49B33] h-[40px] rounded-[5px] cursor-pointer hover:opacity-90"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      )}
      {!otp && (
        <>
          <div className="h-[100vh] w-[100vw] flex justify-center items-center absolute top-0 bg-[white] text-black">
            <div className="h-[30%] border-[#0000001b] border w-[25%]  p-[20px] flex flex-col justify-between rounded-2xl shadow-2xl">
              <h1 className="text-[20px] font-bold">Change Your Password</h1>

              <div className="flex flex-col ">
                <label htmlFor="username">Your Username</label>
                <input
                  type="text"
                  placeholder="Your Username"
                  className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
                  name="oldpassword"
                  id="oldpassword"
                  value={userId}
                  onChange={handleChange}
                />
              </div>

              <button
                className="w-[100%] bg-[#2B2B2B] text-[#F49B33] h-[40px] rounded-[5px] cursor-pointer hover:opacity-90"
                onClick={handleSubmit}
              >
                Forget Password
              </button>
            </div>
          </div>
        </>
      )}
      {error && <Error text={error} />}
      {message && <Message text={message} />}
    </>
  );
}

export default ForgotPassword;
