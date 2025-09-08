import { X } from "lucide-react";
import React, { useState } from "react";

function AddBestDish({setOption}) {
  const [dish, setDish] = useState(null);
  const handleChange = (e) => {
    setDish(e.target.value);
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
        <label className="text-[20px] pb-[10px]">Add Best Dish</label>
        <input
          type="text"
          placeholder="Biriyani"
          className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5 bg-[white] text-black w-[80%]"
          name="menu"
          id="menu"
          value={dish}
          onChange={handleChange}
        />
      <button className="btn btn-warning">Add Best Dish</button>
      </div>
    </div>
  );
}

export default AddBestDish;
