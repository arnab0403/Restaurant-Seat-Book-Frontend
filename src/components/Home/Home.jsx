import Navbar from "../Navbar/Navbar";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../DataContext/DataContext";
import Resturants from "../Resturants/Resturants";
import Loading from "../Basic/Loading";
import { MessageCircle, X } from "lucide-react";

function Home() {
  const { location, setLocation } = useContext(DataContext);
  const [error, setError] = useState(null);
  const [myLocation, setMyLocation] = useState({
    longitude: "",
    latitude: "",
  });

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          const loc = {
            longitude: longitude,
            latitude: latitude,
          };
          setMyLocation(loc);
          console.log("loctaion fetched");
        },
        (err) => {
          setError(
            "Unable to fetch location. Please enable location services."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Dummy bot reply
  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((msgs) => [
      ...msgs,
      { from: "user", text: chatInput },
      { from: "bot", text: "I'm just a demo bot! You said: " + chatInput },
    ]);
    setChatInput("");
  };

  return (
    <>
      {!location && <Loading />}
      <Navbar />
      <Resturants myLocation={myLocation} />

      {/* Chatbot Floating Button & Window */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chatbot Window */}
        {chatOpen && (
          <div className="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 animate-slide-up">
            <div className="flex items-center justify-between px-4 py-3 bg-[#F49B33] rounded-t-xl">
              <span className="font-bold text-white">ChatBot</span>
              <button
                className="text-white hover:text-gray-200"
                onClick={() => setChatOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-[#fffaf3]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${
                      msg.from === "user"
                        ? "bg-[#F49B33] text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleChatSend}
              className="p-3 border-t border-gray-200 bg-white flex gap-2"
            >
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F49B33] text-black"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#F49B33] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d8842b] transition"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Floating Button */}
        {!chatOpen && (
          <button
            className="bg-[#F49B33] hover:bg-[#d8842b] text-white rounded-full shadow-lg p-4 flex items-center justify-center transition"
            onClick={() => setChatOpen(true)}
            aria-label="Open Chatbot"
          >
            <MessageCircle size={28} />
          </button>
        )}
      </div>

      {/* Chatbot slide-up animation */}
      <style>
        {`
          .animate-slide-up {
            animation: chatbot-slide-up 0.3s cubic-bezier(.4,0,.2,1);
          }
          @keyframes chatbot-slide-up {
            from { transform: translateY(60px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}

export default Home;
