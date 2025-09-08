import { X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { deleteMenuItem } from "../../api/api";
import Cookies from "universal-cookie";

function DeteletMenu({ setOption, menu, getResById }) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { id } = useParams();
  const [deleteMenu, setDeleteMenu] = useState({
    item: "",
    price: "",
  });
  const handleChange = (e) => {
    setMenu({ ...deleteMenu, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState(null);

  const handleDeleteMenu = async (id) => {
    console.log(id);
    const response = await deleteMenuItem(id, token);
    console.log(response);
    if (response.status === 200) {
      setOption("");
      getResById();
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  bg-[white] border-black border-5px h-[280px] w-[280px] text-black rounded-[5px]">
      <div
        className=" absolute top-2 right-2 cursor-pointer hover:bg-[#F49B33] hover:text-[white] rounded-[2px]"
        onClick={() => {
          setOption(null);
        }}
      >
        <X />
      </div>
      <div className="flex flex-col justify-center items-center h-[100%] gap-[15px]">
        <label className="text-[20px] pb-[10px]">Delete Menu</label>
        {menu?.map((item, index) => {
          return (
            <div
              className="border-b flex justify-between items-center gap-5"
              key={index}
            >
              <div className="flex font-bold">
                <p>{item.item}</p>
                <p>₹ {item.price}</p>
              </div>

              <button
                onClick={() => {
                  handleDeleteMenu(item.id);
                }}
                className="btn bg-[#ff2424] border-red-400 hover:bg-red-400 h-[40px]"
              >
                Remove
              </button>
            </div>
          );
        })}
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

export default DeteletMenu;
