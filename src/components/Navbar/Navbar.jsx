import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext/DataContext";
import User from "./User";
import { House, LogIn, Siren, TableOfContents,Lock, TicketPercent } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [sideNav,setSideNav]=useState(false); 

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
      <div className="h-[90px] w-[100vw] lg:px-[100px] md:px-[70px] px-[25px] flex items-center justify-between shadow-2xl fixed top-0 left-0 z-49 bg-[white] text-black ">
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

        <div className="md:hidden flex  text-[#F49B33] cursor-pointer ">
            <TableOfContents size={28} strokeWidth={2.7} onClick={()=>setSideNav(true)}/>
        </div>
        
      </div>
      {/* side Nav for mobile */}
      {sideNav && (
        <div className="bg-[white] px-[10px] py-[20px] z-50 h-[100%] fixed top-0 w-[200px] right-0 text-[black] drop-shadow-2xl rightToLeft">
            <div className="flex justify-between items-center">
              <p className="text-[22px] font-semibold">DineQ</p>
              <TableOfContents size={28} strokeWidth={2} className="cursor-pointer" onClick={()=>setSideNav(false)}/>
            </div>
            <div className="w-[100%] border"></div>

            <div>
              <div className="flex flex-col mt-2.5">
                <div className="flex flex-col  pr-[15px]">
                <div
                  className={`flex cursor-pointer font-semibold gap-2 px-[5px] py-[10px] hover:bg-[#332814da] hover:text-white rounded-[8px] ${
                    navState === "home" ? "border-[#F49B33]" : ""
                  }`}
                  onClick={handleHome}
                >
                  <House strokeWidth={1.5} />
                  <p>Home</p>
                </div>
                <div
                  className={`flex cursor-pointer font-semibold gap-2 px-[5px] py-[10px] hover:bg-[#332814da] hover:text-white rounded-[8px]${
                    navState === "contact" ? "border-[#F49B33] " : ""
                  }`}
                  onClick={handleContact}
                >
                  <Siren strokeWidth={1.5} />
                  <p>Contact</p>
                </div>
                {!user && (
                  <div
                    className=" text-[16px] flex cursor-pointer font-semibold gap-2 px-[5px] py-[10px] hover:bg-[#332814da] hover:text-white rounded-[8px]  "
                    onClick={() => navigate("/adminSign")}
                  >
                   <Lock strokeWidth={1.5} />
                    <p>Admin Sign</p>
                  </div>
                )}

                {!user && (
                  <div
                    className={`flex text-[16px] font-semibold gap-2 px-[5px] py-[10px] hover:bg-[#332814da] hover:text-white rounded-[8px] cursor-pointer ${
                      navState === "signup" ? "border-[#F49B33] " : ""
                    }`}
                    onClick={handleSignup}
                  >
                    <LogIn strokeWidth={1.5} />
                    <p>Sign Up</p>
                  </div>
                )}

                {!user && (
                  <div
                    className={`cursor-pointer flex text-[16px] font-semibold gap-2 px-[5px] py-[10px] hover:bg-[#332814da] hover:text-white rounded-[8px] ${
                      navState === "booking" ? "border-[#F49B33] border-b-[2px]" : ""
                    }`}
                    onClick={handleBooking}
                  >
                    <TicketPercent strokeWidth={1.5} />
                    <p>Bookings</p>
                  </div>
                )}
                </div>

                {/* {It will help me for login} */}
                {/* <div className="flex w-[15%]  items-center border-[#F49B33] ">
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
                </div> */}
              </div>
            </div>
      </div>)}
      
    </>
  );
}

export default Navbar;
