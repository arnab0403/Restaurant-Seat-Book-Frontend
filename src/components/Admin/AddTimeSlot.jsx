import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { addTimeSlot } from "../../api/api";
import Cookies from "universal-cookie";

const timeSlot = {
  availableSeats: "",
  time: "",
};

// getting some details by parent componet
function AddTimeSlot({ setOption, id, totalSeats, getResById }) {
  console.log(id);
  console.log(totalSeats);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [slot, setSlot] = useState(timeSlot);
  useEffect(() => {
    setSlot({ ...slot, ["availableSeats"]: totalSeats });
  }, []);

  const handleChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const handleButton = async () => {
    console.log(slot);
    const res = await addTimeSlot(id, token, slot);
    if (res.status === 200) {
      setOption(null);
    }
    getResById();
    console.log(res);
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
        <label className="text-[20px] pb-[10px]">New Time</label>
        <input
          type="text"
          placeholder="10:00 PM"
          className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5 bg-[white] text-black w-[80%]"
          name="time"
          id="time"
          value={slot.time}
          onChange={handleChange}
        />
        <button className="btn btn-warning" onClick={handleButton}>
          Add Time
        </button>
      </div>
    </div>
  );
}

export default AddTimeSlot;
