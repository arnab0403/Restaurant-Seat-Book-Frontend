import React from "react";
import { CheckCheck, TicketX } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { getBookingDetailsAdmin } from "../../api/api";
import { useParams } from "react-router";

function UserBookingTable() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [listOfBooking, setListOfBookings] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getDet = async () => {
      const response = await getBookingDetailsAdmin(id, token);
      setListOfBookings(response.data);
      console.log(response);
    };
    getDet();
  }, []);
  useEffect(()=>{
    
  })
  return (
    <div className="overflow-hidden rounded-[10px] shadow-2xl">
      <table className="w-full border-collapse">
        <thead className="bg-white">
          <tr className="border-b border-[#F49B33]">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Mobile Number</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">People</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {listOfBooking?.map((data) => {
            return (
              <tr className="border-b border-[#F49B33] text-center">
                <td className="px-4 py-2">{data.name}</td>
                <td className="px-4 py-2">{data.phone}</td>
                <td className="px-4 py-2">{data.slotTime}</td>
                <td className="px-4 py-2">{data.email}</td>
                <td className="px-4 py-2">{data.seats}</td>
                <td className="px-4 py-2">{data.amount / 100}</td>
                <td className="px-4 py-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer hover:opacity-90">
                    <CheckCheck color="white" />
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded ml-2 cursor-pointer  hover:opacity-90 ">
                    <TicketX color="white" />
                  </button>
                </td>
              </tr>
            );
          })}
          {/* Example row */}
        </tbody>
      </table>
    </div>
  );
}

export default UserBookingTable;
