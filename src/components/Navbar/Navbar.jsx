import { useNavigate } from "react-router";
import { useContext } from "react";
import { DataContext } from "../DataContext/DataContext";
import User from "./User";
import { TableOfContents } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { navState, setNavState, user } = useContext(DataContext);
  const handleSignup = () => {
    navigate("/signup");
    setNavState("signup");
  };

  const handleHome = () => {
    navigate("/");
    setNavState("home");
  };

  const handleContact = () => {
    navigate("/contact");
    setNavState("contact");
  };
  const handleBooking = () => {
    navigate("/booking");
    setNavState("booking");
  };

  return (
    <>
      <div className="h-[90px] w-[100vw] lg:px-[100px] md:px-[70px] px-[25px] flex items-center justify-between shadow-2xl fixed top-0 left-0 z-[990] bg-[white] text-black ">
        <div className="">
          <h1 className="text-[18px] font-[500]">
            Welcome To <span className="text-[#F49B33] font-bold">DineQ</span>
          </h1>
        </div>

        <div className=" hidden md:flex">
          <div className="flex items-center gap-5  pr-[15px]">
          <p
            className={` cursor-pointer font-[500] ${
              navState === "home" ? "border-[#F49B33] border-b-[2px]" : ""
            }`}
            onClick={handleHome}
          >
            Home
          </p>
          <p
            className={`cursor-pointer font-[500]  ${
              navState === "contact" ? "border-[#F49B33] border-b-[2px]" : ""
            }`}
            onClick={handleContact}
          >
            Contact
          </p>
          {!user && (
            <p
              className="text-[#F49B33] text-[16px] font-bold cursor-pointer "
              onClick={() => navigate("/adminSign")}
            >
              Admin Sign
            </p>
          )}

          {!user && (
            <p
              className={`text-[#F49B33] text-[16px] font-bold cursor-pointer ${
                navState === "signup" ? "border-[#F49B33] border-b-[2px]" : ""
              }`}
              onClick={handleSignup}
            >
              Sign Up
            </p>
          )}

          {user && (
            <p
              className={`text-[#F49B33] text-[16px] font-bold cursor-pointer ${
                navState === "booking" ? "border-[#F49B33] border-b-[2px]" : ""
              }`}
              onClick={handleBooking}
            >
              Bookings
            </p>
          )}
          </div>
          <div className="flex w-[15%]  items-center border-l-[2px] pl-[15px] border-[#F49B33] ">
            {user ? (
              <User name={user.name} />
            ) : (
              <button
                className="btn bg-[#F49B33] border-[#fe9216] hover:opacity-80"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>

        <div className="md:hidden flex  text-[#F49B33] cursor-pointer border">
            <TableOfContents size={28} strokeWidth={2.7}/>
        </div>
        
      </div>
      <div className="bg-[white] absolute z-50 h-[100vh] border">
            
      </div>
    </>
  );
}

export default Navbar;
