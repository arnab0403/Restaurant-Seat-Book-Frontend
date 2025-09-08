import Home from "./components/Home/Home";
import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ResturantProfile from "./components/Resturants/ResturantProfile";
import SignUp from "./components/SignUp/SignUp";
import Otp from "./components/SignUp/Otp";
import AddRestaurant from "./components/Resturants/AddRestaurants";
import Admin from "./components/Admin/Admin";
import AdminRestaurants from "./components/Admin/AdminRestaurants";
import Contact from "./components/ContactUs/Contact";
import ChangePassword from "./components/Login/ChangePassword";
import ForgotPassword from "./components/Login/FogetPassword";
import Ai from "./components/Ai/Ai";
import Booking from "./components/Booking/Booking";
import AdminSignUp from "./components/SignUp/AdminSignUp";
import AdminOtp from "./components/SignUp/AdminOtp ";
import AddRestaurantss from "./components/Resturants/AddRestaurantss";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/resturants/:id" element={<ResturantProfile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/otp" element={<Otp />}></Route>
        <Route path="/adminotp" element={<AdminOtp />}></Route>
        <Route path="/addrestaurants" element={<AddRestaurant />}></Route>
        <Route path="/addrestaurantss" element={<AddRestaurantss />}></Route>
        <Route path="/admin" element={<AdminRestaurants />}></Route>
        <Route path="/adminpanel/:id" element={<Admin />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/ai" element={<Ai />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/adminSign" element={<AdminSignUp />}></Route>

        <Route path="*" element={<PageNotFound />}></Route>
 
      </Routes>
    </>
  );
}

export default App;
