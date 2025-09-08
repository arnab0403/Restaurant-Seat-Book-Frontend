import { AlarmClockCheck, X } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { addMenu } from "../../api/api";
import Cookies from "universal-cookie";

function AddMenu({ setOption, getResById }) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { id } = useParams();
  const [menu, setMenu] = useState({
    item: "",
    price: "",
  });
  const handleChange = (e) => {
    setMenu({ ...menu, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState(null);

  const handleAddMenu = async () => {
    if (menu === null) {
      return setError(true);
    }
    const response = await addMenu(id, menu, token);
    if (response.status === 200) {
      setOption(null);
      getResById();
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
        <label className="text-[20px] pb-[10px]">Add New Menu</label>
        <input
          type="text"
          placeholder="Fried Momo"
          className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5 bg-[white] text-black w-[80%]"
          name="item"
          id="item"
          value={menu.item}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="₹255"
          className="border-[#00000068] border-1 rounded-[3px] h-[40px] pl-2.5 bg-[white] text-black w-[80%]"
          name="price"
          id="price"
          value={menu.price}
          onChange={handleChange}
        />
        <button className="btn btn-warning" onClick={handleAddMenu}>
          Add Menu
        </button>
      </div>
      {error && (
        <div role="alert" className="alert alert-error absolute w-[100%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Menu Field is Empty..!.</span>
        </div>
      )}
    </div>
  );
}

export default AddMenu;
