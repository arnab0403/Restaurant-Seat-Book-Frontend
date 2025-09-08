import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Navbar from "../Navbar/Navbar";
import { addRestaurant } from "../../api/api";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    place: "",
    openTime: "",
    menu: [{ item: "", price: "" }],
    bestDishes: "",
    coordinates: "",
    slotTimes: "",
    totalSeats: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   const storedToken = cookies.get("token");
  //   if (!storedToken) {
  //     navigate("/login");
  //   }
  //   setToken(storedToken);
  // }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleMenuChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMenu = [...formData.menu];
    updatedMenu[index][name] =
      name === "price" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const addMenuItem = () => {
    setFormData((prev) => ({
      ...prev,
      menu: [...prev.menu, { item: "", price: "" }],
    }));
  };

  const removeMenuItem = (index) => {
    const updatedMenu = [...formData.menu];
    updatedMenu.splice(index, 1);
    setFormData((prev) => ({ ...prev, menu: updatedMenu }));
  };

  // const handleFileChange = (e) => {
  //   setFormData((prev) => ({ ...prev, photos: e.target.files }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate coordinates
      const [latStr, longStr] = formData.coordinates
        .split(",")
        .map((val) => val.trim());
      const latitude = parseFloat(latStr);
      const longitude = parseFloat(longStr);

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error("Invalid coordinates. Use format: latitude,longitude");
      }

      // Validate menu items
      const validMenu = formData.menu.filter(
        (item) => item.item.trim() && !isNaN(item.price)
      );
      if (validMenu.length === 0) {
        throw new Error("Please add at least one valid menu item");
      }

      // Validate total seats
      if (!formData.totalSeats || isNaN(formData.totalSeats)) {
        throw new Error("Please enter a valid number of seats");
      }

     


      // api call 
      const response = await addRestaurant(formData);

      setSuccess("Restaurant added successfully!");
      setIsLoading(false);

      // Reset form
      setFormData({
        name: "",
        description: "",
        place: "",
        openTime: "",
        menu: [{ item: "", price: "" }],
        bestDishes: "",
        coordinates: "",
        slotTimes: "",
        photos: null,
        totalSeats: "",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setIsLoading(false);
      console.error("Error:", err);

      if (err.response) {
        setError(err.response.data?.message || "Failed to add restaurant");
      } else if (err.request) {
        setError("Network error. Please try again.");
      } else {
        setError(err.message || "An error occurred");
      }
    }
  };

  return (
    <div className="bg-white flex justify-center">
      <Navbar />
      <div
        className="add-restaurant-container drop-shadow-2xl  text-black mt-[140px]"
        style={styles.container}
      >
          <h2 style={styles.heading}>Add Restaurant</h2>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ ...styles.input, minHeight: "100px" }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location/Address</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Opening Hours</label>
            <input
              type="text"
              name="openTime"
              placeholder="e.g. 9:00 AM - 10:00 PM"
              value={formData.openTime}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Menu Items</label>
            {formData.menu.map((item, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                <input
                  type="text"
                  name="item"
                  placeholder="Item name"
                  value={item.item}
                  onChange={(e) => handleMenuChange(index, e)}
                  required
                  style={{ ...styles.input, flex: 2 }}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={item.price || ""}
                  onChange={(e) => handleMenuChange(index, e)}
                  required
                  min="0"
                  step="0.01"
                  style={{ ...styles.input, flex: 1 }}
                />
                {formData.menu.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMenuItem(index)}
                    style={styles.removeButton}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addMenuItem}
              style={styles.addButton}
            >
              + Add Menu Item
            </button>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Best Dishes (comma separated)</label>
            <input
              type="text"
              name="bestDishes"
              placeholder="e.g. Margherita Pizza, Tandoori Chicken"
              value={formData.bestDishes}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Coordinates</label>
            <input
              type="text"
              name="coordinates"
              placeholder="e.g. 28.6139,77.2090"
              value={formData.coordinates}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Available Time Slots (comma separated)
            </label>
            <input
              type="text"
              name="slotTimes"
              placeholder="e.g. 12:00 PM, 1:00 PM, 2:00 PM"
              value={formData.slotTimes}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Total Seats</label>
            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              required
              min="1"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Photos</label>
            <input
              type="file"
              name="photos"
              // onChange={handleFileChange}
              multiple
              accept="image/*"
              style={{ ...styles.input, padding: "5px" }}
            />
            <small>Maximum 5 photos (JPEG/PNG)</small>
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Restaurant"}
          </button >
        </div>
        </div>
        
      </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    width: "800px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  error: {
    color: "#d32f2f",
    backgroundColor: "#fde0e0",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
  },
  success: {
    color: "#388e3c",
    backgroundColor: "#ebf5eb",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
    ":hover": {
      backgroundColor: "#45a049",
    },
    ":disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
  },
  addButton: {
    padding: "8px 12px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "5px",
    ":hover": {
      backgroundColor: "#d0d0d0",
    },
  },
  removeButton: {
    padding: "0 8px",
    backgroundColor: "#ffebee",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#c62828",
    fontSize: "18px",
    ":hover": {
      backgroundColor: "#ffcdd2",
    },
  },
};

export default AddRestaurant;
