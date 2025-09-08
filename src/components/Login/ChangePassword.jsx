import { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { getAuthDetails } from "../../api/api";
import { DataContext } from "../DataContext/DataContext";
import Error from "../SignUp/Error";
import { changePassword } from "../../api/api";
function ChangePassword() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(DataContext);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const cookies = new Cookies();
  const [password, setPassword] = useState({
    oldpassword: "",
    newpassword: "",
  });
  const [error, setError] = useState(null); // To handle errors
  const token = cookies.get("token");

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await changePassword(token, password);
    console.log(password);
    console.log(response);
    if (response.data === "Success") {
      navigate("/login");
      cookies.remove("token");
      setUser(null);
    } else {
      setError("Wrong Old Password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-[100vw] flex justify-center items-center absolute top-0 bg-[white] text-black">
        <div className="h-[40%] border-[#0000001b] border w-[25%]  p-[20px] flex flex-col justify-between rounded-2xl shadow-2xl">
          <h1 className="text-[20px] font-bold">Change Your Password</h1>

          <div className="flex flex-col ">
            <label htmlFor="username">Old Password</label>
            <input
              type="password"
              placeholder="Old Password"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="oldpassword"
              id="oldpassword"
              value={password.oldpassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5"
              name="newpassword"
              id="newpassword"
              value={password.newpassword}
              onChange={handleChange}
            />
          </div>

          <button
            className="w-[100%] bg-[#2B2B2B] text-[#F49B33] h-[40px] rounded-[5px] cursor-pointer hover:opacity-90"
            onClick={handleSubmit}
          >
            Change Password
          </button>
        </div>
      </div>
      {error && <Error text={error} />}
    </>
  );
}

export default ChangePassword;
