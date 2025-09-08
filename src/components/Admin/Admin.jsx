import React, { useEffect, useState } from "react";
import { Power, ChefHat } from "lucide-react";
import UserBookingTable from "./UserBookingTable";
import RestaurantController from "./RestaurantController";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

function Admin() {
  const [option, setOption] = useState(2);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const role = cookies.get("role");
  if (role !== "admin") {
    navigate("/");
  }
  return (
    <>
      <div className="grid grid-cols-[60px_auto] bg-[#FFFFFF] text-black">
        <div className="  bg-[white] h-[100vh] flex flex-col items-center pt-[30px] gap-[20px]">
          <div
            onClick={() => setOption(1)}
            tabIndex={0}
            className=" focus:bg-[#5E5E5E] bg-white w-[40px] h-[40px] flex justify-center items-center rounded-[7px] cursor-pointer "
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M28.75 26.25L28.75 3.75C28.75 3.41848 28.6183 3.10054 28.3839 2.86612C28.1495 2.6317 27.8315 2.5 27.5 2.5L21.25 2.5L21.25 27.5L27.5 27.5C27.8315 27.5 28.1495 27.3683 28.3839 27.1339C28.6183 26.8995 28.75 26.5815 28.75 26.25Z"
                fill="#F0AB00"
              />
              <path
                d="M1.25 3.75L1.25 26.25C1.25 26.5815 1.3817 26.8995 1.61612 27.1339C1.85054 27.3683 2.16848 27.5 2.5 27.5L8.75 27.5L8.75 2.5L2.5 2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75Z"
                fill="#F0AB00"
              />
              <path
                opacity="0.5"
                d="M11.25 2.5L18.75 2.5L18.75 27.5L11.25 27.5L11.25 2.5Z"
                fill="#F0AB00"
              />
              <path
                opacity="0.25"
                d="M8.75 2.5L11.25 2.5L11.25 27.5L8.75 27.5L8.75 2.5ZM18.75 2.5L21.25 2.5L21.25 27.5L18.75 27.5L18.75 2.5Z"
                fill="#F0AB00"
              />
            </svg>
          </div>
          <div
            onClick={() => setOption(2)}
            tabIndex={0}
            className=" focus:bg-[#5E5E5E] bg-white w-[40px] h-[40px] flex justify-center items-center rounded-[7px] cursor-pointer "
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.125 4.375C3.125 3.33947 3.96447 2.5 5 2.5L20 2.5C21.0356 2.5 21.875 3.33947 21.875 4.375L21.875 27.5L5 27.5C3.96447 27.5 3.125 26.6606 3.125 25.625L3.125 4.375Z"
                fill="#FFC107"
                stroke="#607D8B"
                strokeLinejoin="round"
              />
              <path
                d="M21.875 15C21.875 14.3096 22.4346 13.75 23.125 13.75L25.625 13.75C26.3154 13.75 26.875 14.3096 26.875 15L26.875 25.625C26.875 26.6606 26.0356 27.5 25 27.5L21.875 27.5L21.875 15Z"
                stroke="#607D8B"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 7.5L11.875 7.5"
                stroke="#90A4AE"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 11.875L14.375 11.875"
                stroke="#90A4AE"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            onClick={() => setOption(3)}
            tabIndex={0}
            className=" focus:bg-[#5E5E5E] bg-white w-[40px] h-[40px] flex justify-center items-center rounded-[7px] cursor-pointer "
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 16.25C14.0114 16.25 16.25 14.0114 16.25 11.25C16.25 8.48858 14.0114 6.25 11.25 6.25C8.48858 6.25 6.25 8.48858 6.25 11.25C6.25 14.0114 8.48858 16.25 11.25 16.25Z"
                fill="#FFC048"
                stroke="#FFC048"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.25 16.25C6.4175 16.25 2.5 19.6075 2.5 23.75H20C20 19.6075 16.0825 16.25 11.25 16.25Z"
                fill="#FFC048"
                stroke="#FFC048"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.75 16.25C19.5855 16.25 20.4076 16.0406 21.1413 15.6409C21.8751 15.2413 22.4969 14.6642 22.9501 13.9623C23.4033 13.2604 23.6735 12.4562 23.7358 11.623C23.7981 10.7899 23.6507 9.95437 23.3069 9.19288C22.9632 8.43138 22.4341 7.76816 21.768 7.26381C21.102 6.75946 20.3201 6.43006 19.494 6.3057C18.6678 6.18134 17.8236 6.26599 17.0386 6.55192C16.2535 6.83785 15.5527 7.31594 15 7.9425M15 14.7063C16.1213 15.8838 17.7413 16.25 18.75 16.25C23.5825 16.25 27.5 19.6075 27.5 23.75H20"
                stroke="#FFC048"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="border w-[80%] border-[#F49B33]"></div>
          <div
            onClick={() => setOption(4)}
            tabIndex={0}
            className="focus:bg-[#5E5E5E] bg-[#f4a64d] w-[30px] h-[30px] flex justify-center items-center p-[2px] rounded-[4px]"
          >
            <Power color="white" size={50} />
          </div>
          <div
            onClick={() => navigate("/admin")}
            tabIndex={0}
            className="focus:bg-[#5E5E5E] bg-[#f4a64d] w-[30px] h-[30px] flex justify-center items-center p-[2px] rounded-[4px]"
          >
            <ChefHat color="white" size={50} />
          </div>
        </div>
        <div className="h-[100vh] text-black bg-[#DADADA] overflow-x-scroll p-[20px] overflow-y-scroll">
          <div className=""></div>
          {option === 1 ? <UserBookingTable /> : ""}
          {option === 2 ? <RestaurantController /> : ""}

          {/* */}

          {/* <SlotManage /> */}
        </div>
      </div>
    </>
  );
}

export default Admin;
