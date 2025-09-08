import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantDetails = () => {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [bookingMessage, setBookingMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!restaurantId || !token) {
      setBookingMessage("Please login to continue.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8081/admin/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRestaurant(res.data);
        const available = res.data.slotTimes.filter((slot) => slot.available);
        setAvailableSlots(available);
        if (available.length > 0) setSelectedSlotId(available[0].id);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setBookingMessage("Error fetching restaurant details.");
      });
  }, [restaurantId, token, navigate]);

  const handleBooking = async () => {
    if (!selectedSlotId || seatsToBook < 1) {
      setBookingMessage("Please select a time and valid seat count.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8081/user/book`,
        {
          restaurantId,
          slotId: selectedSlotId,
          numberOfSeats: seatsToBook,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { amount, orderId, userName, email, phone } = res.data;

      const options = {
        key: "rzp_test_3LLiBbsWJRbZrc", // Razorpay key
        amount: amount,
        currency: "INR",
        name: "Restaurant Booking",
        description: "Table Booking Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            await axios.post(
              `http://localhost:8081/user/confirm-booking`,
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setBookingMessage("Booking confirmed and payment successful!");
          } catch (err) {
            console.error("Confirm error:", err);
            setBookingMessage(
              "Payment succeeded but booking confirmation failed."
            );
          }
        },
        prefill: {
          name: userName,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      if (err.response?.data === "Please login") {
        setBookingMessage("Session expired. Please login again.");
        navigate("/login");
      } else {
        console.error("Booking error:", err);
        setBookingMessage("Booking failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <p>
        <strong>Place:</strong> {restaurant.place}
      </p>
      <p>
        <strong>Open Time:</strong> {restaurant.openTime}
      </p>

      <h3>Menu</h3>
      <ul>
        {restaurant.menu?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h3>Best Dishes</h3>
      <ul>
        {restaurant.bestDishes?.map((dish, idx) => (
          <li key={idx}>{dish}</li>
        ))}
      </ul>

      <h3>Available Time Slots</h3>
      <ul>
        {restaurant.slotTimes?.map((slot, idx) => (
          <li key={idx} style={{ color: slot.available ? "green" : "red" }}>
            {slot.time} -{" "}
            {slot.available
              ? `Available (${slot.availableSeats} seats)`
              : "Not Available"}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Book a Table</h2>
        <label>
          Select Time:
          <select
            value={selectedSlotId}
            onChange={(e) => setSelectedSlotId(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            {availableSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.time} ({slot.availableSeats} seats)
              </option>
            ))}
          </select>
        </label>

        <div style={{ marginTop: "15px" }}>
          <label>
            Number of Seats:
            <input
              type="number"
              min="1"
              value={seatsToBook}
              onChange={(e) => setSeatsToBook(parseInt(e.target.value))}
              style={{ marginLeft: "10px", width: "60px" }}
            />
          </label>
        </div>

        <button
          onClick={handleBooking}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Book & Pay
        </button>

        {bookingMessage && (
          <p style={{ marginTop: "10px", color: "#1976d2" }}>
            {bookingMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
