import axios, { HttpStatusCode } from "axios";
import { use } from "react";

// export const userSignUp = async (user, image) => {
//   const data = new FormData();
//   data.append("user", JSON.stringify(user)); // Send user object as string
//   data.append("image", image); // Send image file

//   try {
//     const response = await axios.post(
//       "http://localhost:8090/api/auth/register-temp",
//       data,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log("Upload successful:", response.data);
//     return response;
//   } catch (error) {
//     console.error("Error uploading:", error);
//     return error.response;
//   }
// };

export const sendOtpRequest = async (email, otp) => {
  const endpoint = "http://localhost:8090/api/auth/verify-otp";
  console.log(email, otp);

  const data = new URLSearchParams();
  data.append("email", email);
  data.append("otp", otp);

  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("OTP verification successful:", response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};

// export const getAuthDetails = async (token) => {
//   const endpoint = "http://localhost:8090/api/auth/auth/check";

//   try {
//     const response = await axios.get(endpoint, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     console.log("Their is some error", error);
//     return error;
//   }
// };



// export const getRestaurants = () => {
//   const endpoint = "http://localhost:8090/admin/resall";

//   try {
//     const response = axios.get(endpoint);
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };



// export const getRestaurantsById = async (id) => {
//   const endpoint = `http://localhost:8090/admin/restaurant/${id}`;

//   try {
//     const response = await axios.get(endpoint);
//     console.log(response);
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

export const getBookingDetailsAdmin = async (id, token) => {
  const endpoint = `http://localhost:8090/admin/current-booking/${id}`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const getRestaurantsByAdmin = async (token) => {
  const endpoint = `http://localhost:8090/admin/restaurants/owned`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {}
};

export const resetSlot = async (id, slotId, token) => {
  console.log(token);
  try {
    const endpoint = `http://localhost:8090/admin/specific-slot-reset/${id}`;
    const slot = Number(slotId);
    const response = await axios.post(endpoint, slot, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const disableEnableSlots = async (id, slotId, token, available) => {
  console.log(id, slotId, token, available);
  const endpoint = `http://localhost:8090/admin/restaurant/${id}/slot/${slotId}/availability?available=${available}`;

  try {
    const response = await axios.put(
      endpoint,
      null, // No body for this PUT request
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Request failed:", error);
    return error;
  }
};

export const resetAllSlots = async (restaurantId, token) => {
  try {
    const endpoint = `http://localhost:8090/admin/restaurant/${restaurantId}/reset-slots`;
    const response = await axios.post(endpoint, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

//
export const addMenu = async (restaurantId, menu, token) => {
  try {
    const endpoint = `http://localhost:8090/admin/${restaurantId}/menu`;
    const response = axios.post(endpoint, menu, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

//delete menu

export const deleteMenuItem = async (menuId, token) => {
  const endpoint = `http://localhost:8090/admin/menu/${menuId}`;
  try {
    const response = axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleSlotBooking = async (
  id,
  slotId,
  people,
  token,
  setBookingMessage
) => {
  console.log("id", id, "slot", slotId, "people", people);
  const endpoint = "http://localhost:8090/user/book";
  try {
    const response = await axios.post(
      endpoint,
      {
        restaurantId: id,
        slotId: slotId,
        numberOfSeats: people,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    const { amount, orderId, userName, email, phone } = response.data;

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
            `http://localhost:8090/user/confirm-booking`,
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
          setBookingMessage("Booking Confirm");
          setTimeout(() => {
            setBookingMessage(null);
          }, 5000);
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
    if (err.response && err.response.status === 400) {
      return err.response;
    } else {
      console.error("Booking error:", err);
      return "Booking failed. Please try again.";
    }
  }
};

// adding new time slot
export const addTimeSlot = async (id, token, slot) => {
  try {
    console.log(slot);
    const endpoint = `http://localhost:8090/admin/${id}/slot`;
    const res = await axios.post(endpoint, slot, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

// deleteing slot
export const deleteTimeSlot = async (id, token, time) => {
  try {
    const encodedSlot = encodeURIComponent(time); // Safely encode slot like "10:00 AM"
    const endpoint = `http://localhost:8090/admin/${id}/slot/${encodedSlot}`;

    const res = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    return err.response;
  }
};

//delete Restaurant
export const deleteRestaurant = async (id, token) => {
  const endpoint = `http://localhost:8090/admin/delete/res/${id}`;
  try {
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// Feedback

export const sendFeedBack = async (message, token) => {
  const endpoint = "http://localhost:8090/api/auth/feedback";
  try {
    const response = await axios.post(
      endpoint,
      { messages: message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

//change password
export const changePassword = async (token, password) => {
  console.log(password);
  const endpoint = "http://localhost:8090/api/auth/changepassword";
  try {
    const response = await axios.put(
      endpoint,
      {
        oldpassword: password.oldpassword,
        newpasssword: password.newpassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// forget password
export const forgetPassword = async (username) => {
  const endpoint = "http://localhost:8090/api/auth/forget";

  try {
    const response = await axios.post(endpoint, {
      username: username,
    });
    console.log(response);
    return response;
  } catch (error) {
    return error.message;
  }
};

// //verify otp for forget password
// export const verifyOtp = async (username, otp, newpassword) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8090/api/auth/verify",
//       null,
//       {
//         params: {
//           username: username,
//           otp: otp,
//           newpassword: newpassword,
//         },
//       }
//     );
//     console.log("Server Response:", response);
//     return response;
//   } catch (error) {
//     return error.response;
//   }
// };

// getting bookings

export const getBookings = async (token) => {
  const endpoint = "http://localhost:8090/api/auth/userbooking";
  try {
    const response = axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

//getting Restaurant Name

export const getRestaurantsNameById = async (id) => {
  const endpoint = `http://localhost:8090/admin/restaurant/${id}`;

  try {
    const response = await axios.get(endpoint);
    console.log(response);
    return response.data.name;
  } catch (error) {
    return error;
  }
};

// ai
const aiFeedback = async (query) => {
  const endpoint = `http://localhost:8090/api/ask?question=${encodeURIComponent(
    query
  )}`;
  try {
    const response = axios.get(endpoint);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteCurrentBooking = async (id, token) => {
  console.log(id);
  const endpoint = `http://localhost:8090/admin/current-booking/${id}`;
  try {
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const adminSignUp = async (user, image) => {
  const data = new FormData();
  data.append("user", JSON.stringify(user)); // Send user object as string
  data.append("image", image); // Send image file

  try {
    const response = await axios.post(
      "http://localhost:8090/api/auth/adminregister-temp",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload successful:", response.data);
    return response;
  } catch (error) {
    console.error("Error uploading:", error);
    return error.response;
  }
};

export const sendOtpRequestAdmin = async (email, otp) => {
  const endpoint = "http://localhost:8090/api/auth/adminverify-otp";
  console.log(email, otp);

  const data = new URLSearchParams();
  data.append("email", email);
  data.append("otp", otp);

  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("OTP verification successful:", response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};




// Node JS 

export const userLogin = async (user) => {
    try {
      const {email,password}=user
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {email, password},
        { withCredentials: true } // 🔑 needed for cookies
      );
      return res.data;
    } catch (err) {
      return err;
    }
  };


export const getAuthDetails  = async()=>{
  try {
    const res =await axios.get(
      "http://localhost:3000/api/auth/userjwt",
      {withCredentials:true}
    );
    return res.data;
  } catch (error) {
    return error
  }
}

export const logout = async()=>{
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {withCredentials:true}
    );
    return res.data;
  } catch (error) {
    return error
  }
}

export const userSignUp =async(user)=>{
  try {
    const {name,email,phone,password,imageUrl}=user;
    const response = await axios.post("http://localhost:3000/api/auth/signup",{name,email,phone,password,imageUrl});
    return response.data;    
  } catch (error) {
    return error;
  }
}

export const verifyOtpSignUp = async (email,otp)=>{
  try {
    const response = await axios.post("http://localhost:3000/api/auth/verifyotp",{email,otp});
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export const addRestaurant = async(restaurant)=>{
  try {
    const response = await axios.post("http://localhost:3000/api/restaurant/add",restaurant);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getAllRestaurants = async()=>{
  try {
    const response = await axios.get("http://localhost:3000/api/restaurant/");
    return response.data;
  } catch (error) {
    return error;
  }
}


export const getRestaurantsById=async(id)=>{
  try {
    const response = await axios.get('http://localhost:3000/api/restaurant/68c4592175037641fe24f781');
    return response.data;
  } catch (error) {
    
  }
}