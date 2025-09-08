import { AlarmClockCheck, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addMenu, deleteRestaurant } from "../../api/api";
import Cookies from "universal-cookie";

function DeleteRestaurant({ setOption }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { id } = useParams();

  const handleDeleteRestaurant = async () => {
    const response = await deleteRestaurant(id, token);
    if (response.status === 200) {
      setOption(null);
      navigate("/admin");
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  bg-[white] border-black border-5px h-[200px] w-[280px] text-black rounded-[5px]">
      <div
        className=" absolute top-2 right-2 cursor-pointer hover:bg-[#F49B33] hover:text-[white] rounded-[2px]"
        onClick={() => {
          setOption(null);
        }}
      >
        <X />
      </div>
      <div className="flex flex-col justify-center items-center h-[100%] gap-[15px]">
        <p className="text-[20px] pb-[10px] font-semibold text-center">
          Are You Sure You Want to Delete ?
        </p>
        <button className="btn btn-warning" onClick={handleDeleteRestaurant}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteRestaurant;
