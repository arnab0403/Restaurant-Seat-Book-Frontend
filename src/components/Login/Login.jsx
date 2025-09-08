import { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { userLogin } from "../../api/api";
import { DataContext } from "../DataContext/DataContext";
import Error from "../SignUp/Error";

function Login() {

  const navigate = useNavigate();
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState(null); // To handle errors
  const [token, setToken] = useState(null); // To store the token
  
  const { user, setUser } = useContext(DataContext);
  // Check for token in cookies on component mount
  useEffect(() => {
    console.log(user);
    if (user!==null) {
      if (user.roles[0] === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, []);


  const handleChange = (e) => {
    setUserLog({ ...userLog, [e.target.id]: e.target.value });
  };


  const handleSubmit=async()=>{
    const response =await userLogin(userLog);
    console.log(response)
    if (response.status === "failed") {
      const error = response.response.data.message;
      setError(error);
      setTimeout(()=>{
        setError("")
      },3000)
    }
    const userData = response.user;
    setUser(userData);
    navigate("/");

    // need to update
    // if (userData.isVerified) {
      //   setUser(userData);
      //   navigate("/");
    // }else{
    //   navigate("/otp", { state: { email: userData.email } })
    // }
  }



  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-[100vw] flex justify-center items-center absolute top-0 bg-[white] text-black">
        <div className="h-[45%] border-[#0000001b] border w-[25%]  p-[20px] flex flex-col justify-between rounded-2xl shadow-2xl">
          <h1 className="text-[20px] font-bold">Login to Your Account</h1>

          <div className="flex flex-col ">
            <label htmlFor="email">User Email</label>
            <input
              type="text"
              placeholder="BobSmith@gmail.com"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="email"
              id="email"
              value={userLog.email}
              onChange={handleChange}
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
              value={userLog.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-[100%] bg-[#2B2B2B] text-[#F49B33] h-[40px] rounded-[5px] cursor-pointer hover:opacity-90"
            onClick={handleSubmit}
          >
            Login
          </button>
          <button
            className="w-[100%] bg-[#2B2B2B] text-[#F49B33] h-[40px] rounded-[5px] cursor-pointer hover:opacity-90"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot Password
          </button>
        </div>
      </div>
      {error && <Error text={error} />}
    </>
  );
}

export default Login;
