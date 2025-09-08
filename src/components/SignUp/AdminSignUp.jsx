import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "../Navbar/Navbar";
import { adminSignUp,  } from "../../api/api";
import Error from "./Error";
function AdminSignUp() {
  const userTemp = {
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  };

  const [user, setUser] = useState(userTemp);
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await adminSignUp(user, image);
    console.log(result);
    if (result.status === 200) {
      navigate("/adminotp", { state: { email: user.email } }); // Navigate to OTP route with username as a prop
    } else if (result.status === 409) {
      console.log(result);
      setError(result.data);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-[calc(100vh - 90px)] flex justify-center items-center bg-[white] text-black border-[pink] mt-[60px]">
        <div className="h-[85%] border-[#0000001b] border w-[30%]  p-[20px] flex flex-col justify-between rounded-2xl shadow-2xl">
          <h1 className="text-[20px] font-bold">Let's get you started</h1>
          <div className="flex flex-col ">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              placeholder="Bob Smith"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="name"
              id="name"
              onChange={handleChange}
              value={user.name}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              placeholder="bob@561"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="username"
              id="username"
              onChange={handleChange}
              value={user.username}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="phone">Mobile Number</label>
            <input
              type="number"
              placeholder="8000100245"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={user.phone}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              placeholder="BobSmith@gmail.com"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="email"
              id="email"
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Kolkata, West Bengal"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="address"
              id="address"
              onChange={handleChange}
              value={user.address}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="*********"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="password"
              id="password"
              onChange={handleChange}
              value={user.password}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="image">Profile Picture</label>
            <input
              type="file"
              className="file-input file-input-ghost"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setImage(selectedFile);
                console.log(selectedFile); // Log the selected file directly
              }}
            />
          </div>
          <button
            className="w-[100%] bg-[#2B2B2B] text-[#F49B33] h-[40px] rounded-[5px] cursor-pointer hover:opacity-90"
            onClick={handleSubmit}
          >
            Send One Time Password
          </button>
        </div>
      </div>
      {error && <Error text={error} />}
    </>
  );
}

export default AdminSignUp;
