import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useParams } from "react-router";
import { getRestaurantsById, handleSlotBooking } from "../../api/api";
import { Armchair, MapPin, MoveLeft, MoveRight, Utensils } from "lucide-react";
import axios from "axios";
import Cookies from "universal-cookie";
import Error from "../SignUp/Error";
import Message from "./Message";

function ResturantProfile() {
  const { id } = useParams();
  console.log(id);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [resDetails, setResDetails] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("");
  const [slotId, setSlotId] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const getResById = async () => {
      const response = await getRestaurantsById(id);
      console.log(response);
      setResDetails(response.restaurant);
    };
    getResById();
  }, [bookingMessage]);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (resDetails?.photos?.length) {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % resDetails.photos.length
        );
      }

      // const script = document.createElement("script");
      // script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // script.async = true;
      // document.body.appendChild(script);
      // return () => {
      //   document.body.removeChild(script);
      // };
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [resDetails]);
  useEffect(()=>{
    
  })
  if (!resDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const photos = resDetails.image || []; // Ensure photos is an array

  const handleFindSlot = () => {
    alert(`Finding slots for ${people} people on ${date} at ${time}`);
  };

  const handleSlotBookingButton = async () => {
    console.log("id", id, "slot", slotId, "people", people);

    const response = await handleSlotBooking(
      id,
      slotId,
      people,
      token,
      setBookingMessage
    );

    console.log(response);

    if (response.status === 400) {
      setError(response.data);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }

  };
  return (
    <>
      <Navbar />
      <div className="lg:grid lg:grid-cols-[auto_340px] gap-6 mt-[90px] pt-[30px] pb-[30px] bg-[#DADADA]">
        <div className="bg-white lg:ml-[100px] md:mx-[70px] mx-[20px] text-black p-10">
          <div className="border-b-[#F49B33] border-b-2">
            <h1>Go Back</h1>
          </div>

          {/* Carousel */}
          <div className="relative mt-[20px]">
            <div className="md:h-[400px] w-[100%] overflow-hidden">
              <img
                className="md:h-[400px] w-[100%] object-cover transition-all duration-500"
                src={`${photos[currentIndex]}`}
                alt={`Slide ${currentIndex + 1}`}
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
            <div className="md:grid md:grid-cols-2 flex flex-col gap-4 md:gap-6">
              <div>
                <h2 className="text-[17px] font-semibold text-[#F49B33] flex items-center gap-0.5">
                  <MapPin strokeWidth={1.5} size={20}/>
                  <p>Location</p>
                </h2>
                <p className="text-[17px] font-semibold">{resDetails.city}</p>
                <h2 className="text-[17px] font-semibold text-[#F49B33] mt-4 flex items-center gap-0.5">
                  <Utensils strokeWidth={1.5} size={20}/>
                  <p>Serve Duration</p>
                </h2>
                <p className="text-[17px] font-semibold">{resDetails.openTime} to {resDetails.closeTime}</p>
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
          <div className="">
            <h1 className="font-semibold text-[#F49B33]">Available Time Slots</h1>
            <div className="flex md:gap-[20px] gap-[10px] mt-2.5">
              {resDetails.slotTime?.map((slot,index) => (
                <div
                  key={index}
                  className={`md:w-[120px] md:h-[38px] w-[80px] h-[34px] ${
                    slot.status="available" ? "bg-[#F49B33]" : "bg-[#5E5E5E]"
                  } text-[white] flex items-center rounded-[4px] justify-center text-center cursor-pointer hover:opacity-85 shadow-2xl gap-2.5`}
                >
                  {slot.time}
                  <h1 className="hidden md:flex">
                    <Armchair/>
                    {slot.totalSeats}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-white mt-2.5 rounded w-full flex flex-col md:flex-row gap-[10px] md:gap-[25px] md:items-center">
            <div className="flex justify-between md:gap-[25px]">
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  const selectedOptionId = e.target.selectedOptions[0].id;
                  setSlotId(selectedOptionId);
                  console.log("Selected option ID:", selectedOptionId);
                }}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F49B33]"
              >
                <option value="">Select Time</option>
                {resDetails.slotTime?.map((slot,index) => {
                  if (slot.status="available") {
                    return (
                      <option
                        key={index}
                        value={slot.time}
                        id={index} // this is fine
                      >
                        {slot.time} - {slot.availableSeats} Seats
                      </option>
                    );
                  }
                })}
              </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  People
                </label>
                <select
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F49B33]"
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleSlotBookingButton}
              className="bg-[#F49B33] cursor-pointer h-[45px] md:w-[130px] text-white px-4 py-2 rounded hover:bg-[#d8842b] transition mt-4.5"
            >
              Book Slot
            </button>
          </div>
        </div>
        <div className="mr-[100px] lg:block hidden"></div>
      </div>
      <Footer />
      {error && <Error text={error} />}
      {bookingMessage && <Message text={bookingMessage} />}
    </>
  );
}

export default ResturantProfile;
