import Footer from "../Footer/Footer";
import { MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllRestaurants } from "../../api/api";

function Resturants() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    const getRes = async () => {
      const response = await getAllRestaurants();
      console.log(response);
      setRestaurant( response.restaurants);
    };
    getRes();
  }, []);

  return (
    <>
      <div className="grid grid-cols-[auto_340px] gap-6 mt-[90px] pt-[30px] pb-[30px]  bg-[#DADADA] text-black">
        <div className=" ml-[100px] bg-[white] p-[50px] ">
          <div>
            <h1 className="text-[25px] text-[#5E5E5E] font-semibold border-b-2 border-[#F49B33]">
              Our Resturants
            </h1>
          </div>
          <div className="flex flex-wrap gap-[25px]">
           
            {restaurant.map((restaurant,id) => (
              <div
                key={id}
                className="w-[300px] flex flex-col gap-1 mt-4 p-[15px] rounded-[5px] cursor-pointer hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                  navigate(`resturants/${restaurant._id}`);
                }}
              >
                <img
                  className="rounded-[4px] h-[180px] object-contain"
                  src={`${restaurant.image[0]}`}
                  alt={restaurant.name}
                />
                <h1 className="text-[18px] font-bold">{restaurant.name}</h1>
                <p className="text-[12px] text-[#5E5E5E]">{restaurant.city}</p>
                <p className="text-[12px] text-[#5E5E5E]">
                  <span className="font-bold">{restaurant.openTime} - {restaurant.closeTime}</span>
                </p>
                <div className="flex gap-2.5">
                  {restaurant.slotTime?.slice(0, 3).map((slot, index) => (
                    <div
                      key={index}
                      className={`h-[40px] w-[70px] ${
                        slot.status="available" ? "bg-[#F49B33]" : "bg-[#5E5E5E]"
                      } rounded-[5px] flex justify-center items-center cursor-pointer`}
                    >
                      <p className="text-white">{slot.time}</p>{" "}
                      {/* Access the 'time' property */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" mr-[100px] flex flex-col text-black gap-3">
          <div className="bg-[white] h-[260px] p-[10px] rounded-[3px]">
            <div className="border-b-[#F49B33] border-b-1 text-center">
              <h1>All Locations</h1>
            </div>
            <div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-3 bg-white">
                  <MapPinned className="text-[#F49B33]" size={24} />
                  <p className="text-[14px] text-[#5E5E5E]">
                    Park Street, Kolkata
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white">
                  <MapPinned className="text-[#F49B33]" size={24} />
                  <p className="text-[14px] text-[#5E5E5E]">
                    Ballygunge, Kolkata
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white">
                  <MapPinned className="text-[#F49B33]" size={24} />
                  <p className="text-[14px] text-[#5E5E5E]">
                    Salt Lake Sector V, Kolkata
                  </p>
                </div>

                <div className="flex items-center gap-3  bg-white">
                  <MapPinned className="text-[#F49B33]" size={24} />
                  <p className="text-[14px] text-[#5E5E5E]">
                    Deshapriya Park, Kolkata
                  </p>
                </div>

                <div className="flex items-center gap-3  bg-white">
                  <MapPinned className="text-[#F49B33]" size={24} />
                  <p className="text-[14px] text-[#5E5E5E]">
                    New Town, Kolkata
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Resturants;
