import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import {
  resetSlot,
  getRestaurantsById,
  disableEnableSlots,
  resetAllSlots,
  deleteTimeSlot,
  deleteCurrentBooking,
} from "../../api/api";
import { Armchair } from "lucide-react";
import Cookies from "universal-cookie";
import AddMenu from "./AddMenu";
import AddBestDish from "./AddBestDish";
import AddTimeSlot from "./AddTimeSlot";
import DeteletMenu from "./DeleteMenu";
import DeleteRestaurant from "./DeleteRestaurant";
function RestaurantController() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { id } = useParams();
  const [resDetails, setResDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [slotTimes, setSlotTimes] = useState(null);
  const [option, setOption] = useState(null);
  const [menu, setMenu] = useState(null);
  const getResById = async () => {
    setLoading(true); // Set loading to true before API call
    try {
      const response = await getRestaurantsById(id);
      setResDetails(response.data);
      setMenu(response.data.menu);
      setSlotTimes(response.data.slotTimes);
      console.log(response.data.slotTimes);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };
  useEffect(() => {
    getResById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-[#F49B33]">Loading...</h1>
      </div>
    );
  }

  const handleSlots = async (slotId) => {
    const res = await resetSlot(id, slotId, token);
    if (res.status === 200) {
      const response = await getRestaurantsById(id);
      setResDetails(response.data);
      setSlotTimes(response.data.slotTimes);
    }
    console.log(res);
  };

  const handleEnableDisable = async (slotId, available) => {
    const res = await disableEnableSlots(id, slotId, token, available);
    if (res.status === 200) {
      const response = await getRestaurantsById(id);
      setResDetails(response.data);
      setSlotTimes(response.data.slotTimes);
    }
  };
  // Reset All the slots
  const resetAll = async () => {
    const response = await resetAllSlots(id, token);
    if (response.status === 200) {
      const response = await getRestaurantsById(id);
      setResDetails(response.data);
      setSlotTimes(response.data.slotTimes);
    }
  };

  const handleSlotDelete = async (time) => {
    const res = await deleteTimeSlot(id, token, time);
    getResById();
  };

  const handleCurrentResetBooking = async () => {
    const res = await deleteCurrentBooking(id, token);
    if (res.status===200) {
      console.log();
    }
  };
  return (
    <>
      <div className="grid grid-cols-[auto_340px] gap-6 pt-[30px] pb-[30px] ">
        <div className="bg-white ml-[100px] text-black p-10 ">
          <div className="border-b-[#F49B33] border-b-2">
            <h1>Go Back</h1>
          </div>

          {/* Carousel */}
          <div className="relative pt-[20px] flex justify-center items-center ">
            <div className="h-[400px] w-[100%] overflow-hidden flex justify-center items-center">
              <img
                src={`http://localhost:8090/photos/${resDetails.photos[0]}`}
                alt=""
                className="h-[100%] border"
              />
            </div>
          </div>

          <div className="pt-[20px] border-b-[#F49B33] border-b-2">
            <h1 className="text-[#F49B33] font-semibold text-[18px] pb-2">
              <span className="text-[black]">{resDetails.name}</span>
            </h1>
          </div>

          {/* Basic Details */}
          <div className="bg-white text-black mt-[20px]">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-[15px] font-bold text-[#F49B33] flex items-center gap-2">
                  Location
                </h2>
                <p className="text-[13px]">{resDetails.place}</p>
                <h2 className="text-[15px] font-bold text-[#F49B33] mt-4 flex items-center gap-2">
                  Open Time
                </h2>
                <p className="text-[13px]">{resDetails.openTime}</p>
              </div>
              <div>
                <h2 className="text-[17px] font-bold text-[#F49B33]">
                  Description
                </h2>
                <p className="text-[13px]">{resDetails.description}</p>
              </div>
            </div>
          </div>

          {/* Slots Area */}
          <div className="mt-[10px]  w-[100%]">
            <h1 className="font-semibold">Available Time Slots</h1>
            <div className="flex gap-[20px] mt-2.5 w-[800px] flex-wrap">
              {slotTimes?.map((slot, index) => (
                <div
                  key={slot.id}
                  className={`w-[120px] h-[38px] ${
                    slot.available ? "bg-[#F49B33]" : "bg-[#5E5E5E]"
                  } text-[white] flex items-center rounded-[4px] justify-center text-center cursor-pointer hover:opacity-85 shadow-2xl gap-2.5`}
                >
                  {/* Generate unique popoverTarget and id using the index */}
                  <button
                    className={` btn ${
                      slot.available ? "bg-[#F49B33]" : "bg-[#5E5E5E]"
                    } text-[white] border-none`}
                    popoverTarget={`popover-${index}`} // Unique popoverTarget
                    style={{ anchorName: `--anchor-${index}` }} // Unique anchorName
                  >
                    {slot.time}
                    <h1 className="flex">
                      <Armchair />
                      {slot.availableSeats}
                    </h1>
                  </button>

                  <ul
                    className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                    popover="auto"
                    id={`popover-${index}`} // Unique id
                    style={{ positionAnchor: `--anchor-${index}` }} // Unique positionAnchor
                  >
                    <li
                      onClick={() => {
                        handleEnableDisable(slot.id, !slot.available);
                      }}
                    >
                      {slot.available ? (
                        <p>Disable Slot</p>
                      ) : (
                        <p>Enable Slot</p>
                      )}
                    </li>
                    <li
                      onClick={() => {
                        handleSlots(slot.id);
                      }}
                    >
                      <p>Reset This Slot</p>
                    </li>
                    <li
                      onClick={() => {
                        handleSlotDelete(slot.time);
                      }}
                      className=" rounded-[7px] bg-red-600 hover:bg-red-500"
                    >
                      <p>Delete This Slot</p>
                    </li>
                  </ul>
                </div>
              ))}
              <button
                className="btn bg-[#337af4] border-none"
                onClick={resetAll}
              >
                Reset All Slots
              </button>
            </div>
          </div>
          <div className="mt-[20px]">
            <h1 className="font-semibold">Menu</h1>
            <div className="flex gap-[20px] mt-2.5 flex-col w-[250px]">
              {resDetails.menu?.map((item, index) => {
                return (
                  <div className="border-b flex justify-between" key={index}>
                    <p>{item.item}</p>
                    <p>₹ {item.price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mr-[100px] flex flex-col gap-2.5">
          <button className="btn w-[70%]" onClick={() => setOption("addMenu")}>
            Add Menu
          </button>
          <button
            className="btn w-[70%]"
            onClick={() => setOption("deleteMenu")}
          >
            Delete Menu
          </button>
          <button className="btn w-[70%]" onClick={() => setOption("addTime")}>
            Add Time Slot
          </button>
          <button
            className="btn w-[70%]"
            onClick={() => setOption("addBestDish")}
          >
            Add Best Dishes
          </button>
          <button className="btn w-[70%]">Delete Best Dishes</button>
          <button
            className="btn bg-red-500 border-red-400 w-[70%]"
            onClick={() => setOption("deleteRestaurant")}
          >
            Delete Restaurant
          </button>
          <button
            className="btn bg-red-500 border-red-400 w-[80%]"
            onClick={() => handleCurrentResetBooking()}
          >
            Reset Current Bookings
          </button>
        </div>
      </div>
      {option === "addMenu" ? (
        <AddMenu setOption={setOption} getResById={getResById} />
      ) : (
        ""
      )}
      {option === "deleteMenu" ? (
        <DeteletMenu
          setOption={setOption}
          menu={menu}
          getResById={getResById}
        />
      ) : (
        ""
      )}
      {option === "addBestDish" ? <AddBestDish setOption={setOption} /> : ""}
      {option === "addTime" ? (
        <AddTimeSlot
          setOption={setOption}
          id={resDetails.id}
          totalSeats={resDetails.totalSeats}
          getResById={getResById}
        />
      ) : (
        ""
      )}
      {option === "deleteRestaurant" ? (
        <DeleteRestaurant setOption={setOption} />
      ) : (
        ""
      )}
    </>
  );
}

export default RestaurantController;
