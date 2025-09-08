import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "../Navbar/Navbar";
import { userSignUp } from "../../api/api";
import Error from "./Error";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

function SignUp() {
  const userTemp = {
    name: "",
    email: "",
    phone: "",
    password: "",
    imageUrl: "",
    confirmPassword:""
  };

  const [user, setUser] = useState(userTemp);
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState(false);
  const [loading,setLoading]=useState(false);

  const handleChange = (e) => {
    if (e.target.id === "phone") {
      console.log("click")
      console.log(e.target.value);
      const number = Number(e.target.value);
      console.log(number)
      if (/^\d*$/.test(e.target.value)) {
        setUser({ ...user, [e.target.id]: e.target.value });
      }
      else{
        return;
      }
    }
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {

    if (loading) {
      return;
    }
    // setting the loading state true 
    setLoading(true);

    // checking if all the fileds are there or not 
    if (!user.confirmPassword || !user.email || !user.imageUrl || !user.name || !user.password || !user.phone) {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return setError("All fileds are needed");
    }

    // calling the API  
    const result = await userSignUp(user, image);

    // console the result 
    console.log(result);

    // setting the state of ui 
    if (result.status === "success") {
      navigate("/otp", { state: { email: user.email } }); // Navigate to OTP route with username as a prop
    } else if (result.status === "failed") {
      console.log(result);

      // setting the error 
      setError(result.data);

      // removing the error after 5 seconds 
      setTimeout(() => {
        setError(false);
      }, 5000);
      setLoading(false);
    }
    else{
      setError("Server down please try again after some time");
      setTimeout(() => {
        setError(false);
      }, 5000);
      setLoading(false);
    }
  };


  // Image Upload after select 
  const handleImageChange = async (e)=>{
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    console.log(selectedFile); 
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "restaurants"); 
    formData.append("folder", "images");             

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/djlwmlrnz/image/upload",
        formData
      );

      setUser({...user,["imageUrl"]:res.data.secure_url});
      alert("Upload successful!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  }

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
            <label htmlFor="phone">Mobile Number</label>
            <input
              type="text"
              placeholder="8000100245"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={user.phone}
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="*********"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
              value={user.confirmPassword}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="image">Profile Picture</label>
            <input
              type="file"
              className="file-input file-input-ghost"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="w-[100%] bg-[#2B2B2B] text-[#F49B33] h-[40px] rounded-[5px] cursor-pointer hover:opacity-90 flex justify-center items-center"
            onClick={handleSubmit}
          >
            {!loading && <p>Send One Time Password</p>}
            
            {loading && (<LoaderCircle className=" animate-spin" />)}
            
          </button>
        </div>
      </div>
      {error && <Error text={error} />}
    </>
  );
}

export default SignUp;
