import React, { useContext } from "react";
import { UserRound, LogOut, KeyRound } from "lucide-react";
import { DataContext } from "../DataContext/DataContext";
import { useNavigate } from "react-router";
import { logout } from "../../api/api";
function User({ name }) {
  const { setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logout();
    console.log(response)
    if (response.status==="success") {
      navigate("/login");
      setUser(null);
    }
  };
  return (
    <div className="dropdown dropdown-hover ml-[15px]">
      <div tabIndex={0} role="button" className="btn m-1 bg-[#F49B33] border-0">
        {name}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-[white] rounded-box z-1 w-52 p-2 shadow-sm absolute right-[1px]"
      >
        <li className="hover:bg-[#e0e0e0] flex">
          <div className="flex">
            <UserRound color="#000000" strokeWidth={2} size={20} />
            <a>My Account</a>
          </div>
        </li>
        <li className="hover:bg-[#e0e0e0]" onClick={handleLogout}>
          <div className="flex">
            <LogOut color="#000000" strokeWidth={2} size={20} />
            <p>Log Out</p>
          </div>
        </li>
        <li
          className="hover:bg-[#e0e0e0]"
          onClick={() => navigate("/changepassword")}
        >
          <div className="flex">
            <KeyRound color="#000000" strokeWidth={2} size={20} />
            <p>Change Password</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default User;
