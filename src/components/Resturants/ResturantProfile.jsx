import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useParams } from "react-router";
import { getRestaurantsById, handleSlotBooking } from "../../api/api";
import { Armchair } from "lucide-react";
import axios from "axios";
import Cookies from "universal-cookie";
import Error from "../SignUp/Error";
import Message from "./Message";

function ResturantProfile() {
  const { id } = useParams();
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
      setResDetails(response.data);
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

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
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

  const photos = resDetails.photos || []; // Ensure photos is an array

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length); // Move to the next image
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    ); // Move to the previous image
  };

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
      <div className="grid grid-cols-[auto_340px] gap-6 mt-[90px] pt-[30px] pb-[30px] bg-[#DADADA]">
        <div className="bg-white ml-[100px] text-black p-10">
          <div className="border-b-[#F49B33] border-b-2">
            <h1>Go Back</h1>
          </div>

          {/* Carousel */}
          <div className="relative pt-[20px]">
            <div className="h-[400px] w-[100%] overflow-hidden">
              <img
                className="h-[400px] w-[100%] object-cover transition-all duration-500"
                src={`http://localhost:8090/photos/${photos[currentIndex]}`}
                alt={`Slide ${currentIndex + 1}`}
              />
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#F49B33] text-white px-3 py-2 rounded-full shadow-lg hover:bg-[#d8842b]"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#F49B33] text-white px-3 py-2 rounded-full shadow-lg hover:bg-[#d8842b]"
            >
              &#8594;
            </button>
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
          <div className="mt-[10px]">
            <h1 className="font-semibold">Available Time Slots</h1>
            <div className="flex gap-[20px] mt-2.5">
              {resDetails.slotTimes?.map((slot) => (
                <div
                  key={slot.id}
                  className={`w-[120px] h-[38px] ${
                    slot.available ? "bg-[#F49B33]" : "bg-[#5E5E5E]"
                  } text-[white] flex items-center rounded-[4px] justify-center text-center cursor-pointer hover:opacity-85 shadow-2xl gap-2.5`}
                >
                  {slot.time}
                  <h1 className="flex">
                    <Armchair />
                    {slot.availableSeats}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-white mt-2.5 rounded w-full flex gap-[25px] items-center">
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
                {resDetails.slotTimes?.map((slot) => {
                  if (slot.available) {
                    return (
                      <option
                        key={slot.id}
                        value={slot.time}
                        id={slot.id} // this is fine
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
            <button
              onClick={handleSlotBookingButton}
              className="bg-[#F49B33] cursor-pointer h-[45px] w-[130px] text-white px-4 py-2 rounded hover:bg-[#d8842b] transition mt-4.5"
            >
              Book Slot
            </button>
          </div>
        </div>
        <div className="mr-[100px]"></div>
      </div>
      <Footer />
      {error && <Error text={error} />}
      {bookingMessage && <Message text={bookingMessage} />}
    </>
  );
}

export default ResturantProfile;
