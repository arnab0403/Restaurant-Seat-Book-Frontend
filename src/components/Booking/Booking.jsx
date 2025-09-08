import Cookies from "universal-cookie";
import Navbar from "../Navbar/Navbar";
import { getBookings, getRestaurantsNameById } from "../../api/api";
import { useEffect, useState } from "react";
import { Ticket } from "lucide-react";

function Booking() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [booking, setBookings] = useState(null);
  const userBooking = async () => {
    const data = await getBookings(token);
    setBookings(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    userBooking();
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-[100vh] mt-[90px] bg-white px-[200px] py-[90px]">
        <ul className="list bg-white  shadow-md text-black border border-[#cfcfcf]">
          <li className="p-4 pb-2 text-[24px] opacity-60 tracking-wide text-black">
            Your Bookings
          </li>
          {booking?.map((item, idx) => (
            <li className="list-row " key={item.id || idx}>
              <div className="flex justify-center items-center">
                <Ticket />
              </div>
              <div>
                <div>{item.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {item.location}
                </div>
              </div>
              <button className="btn btn-square btn-ghost w-[200px]">
                Date {item.bookingTime.split("T")[0]}
              </button>
              <button className="btn btn-square btn-ghost w-[200px]">
                Time {item.bookingTime.split("T")[1].split(".")[0]}
              </button>
              <button className="btn btn-square btn-ghost flex w-[60px]">
                Seats {item.seats}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Booking;
