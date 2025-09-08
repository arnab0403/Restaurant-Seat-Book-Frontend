import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { sendFeedBack } from "../../api/api";
import Cookies from "universal-cookie";

function Contact() {
  const [message, setMessage] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const handleInput = (e) => {
    setMessage(e.target.values);
  };
  const handleSubmit = () => {
    console.log(message);
    const response = sendFeedBack(message, token);
    setMessage("");
  };
  return (
    <>
      <Navbar />
      <div className="w-[100%] bg-white border mt-[90px]">
        <div className="w-[100%] h-[120px] bg-[#F49B33] flex justify-center items-center">
          <h1 className="text-[28px] text-center">Get In Touch</h1>
        </div>
        <div className="px-[25px]">
          <h1>Let's Answer Your Quesitions</h1>
          <div className="h-[80%] py-4">
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2 text-[black]"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-[black] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[grey] transition resize-none text-black"
                rows={5}
              />
            </div>
            <button
              className="bg-[#F49B33] cursor-pointer text-white px-6 py-2 rounded font-semibold hover:bg-[#d8842b] transition"
              type="submit"
              onClick={handleSubmit}
            >
              Send Message
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Contact;
