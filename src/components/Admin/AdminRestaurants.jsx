import Footer from "../Footer/Footer";
import { MapPinned, ChefHat } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuthDetails, getRestaurantsByAdmin } from "../../api/api";
import Cookies from "universal-cookie";
import Navbar from "../Navbar/Navbar";

function AdminRestaurants() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const getRes = async () => {
      const response = await getRestaurantsByAdmin(token);
      console.log(response);
      setRestaurant(response.data);
    };

    getRes();
  }, []);

  const restaurantArray = restaurant ? Object.entries(restaurant) : [];

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[auto_340px] gap-6 mt-[90px] pt-[30px] pb-[30px] bg-[#DADADA] text-black">
        <div className="ml-[100px] bg-[white] p-[50px]">
          <div>
            <h1 className="text-[25px] text-[#5E5E5E] font-semibold border-b-2 border-[#F49B33]">
              Our Restaurants
            </h1>
          </div>
          <div className="flex flex-wrap gap-[25px]">
            {restaurantArray.map(([id, details]) => (
              <div
                key={id}
                className="w-[300px] flex gap-2 mt-4 p-[15px] rounded-[5px] cursor-pointer hover:shadow-2xl transition-all duration-300 bg-[#d6d6d6]"
                onClick={() => {
                  navigate(`/adminpanel/${details.id}`);
                }}
              >
                <ChefHat />
                <h1 className="text-[18px] font-bold">{details.name}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="mr-[100px] flex flex-col text-black gap-3">
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

                <div className="flex items-center gap-3 bg-white">
                  <MapPinned className="text-[#F49B33]" size={24} />
                  <p className="text-[14px] text-[#5E5E5E]">
                    Deshapriya Park, Kolkata
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white">
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

export default AdminRestaurants;
