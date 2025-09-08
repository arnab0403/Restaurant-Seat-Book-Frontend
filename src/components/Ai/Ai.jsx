import React, { useState, useEffect } from "react";
import axios from "axios";

function Ai() {
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error("Failed to load restaurants:", err));
  }, []);

  const askAI = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8090/api/ask?question=${encodeURIComponent(query)}`
      );
      setResponse(res.data.response);
    } catch (err) {
      setResponse("Error getting recommendation: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "Arial, sans-serif",
        
      }} className="text-black"
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #e1e4e8",
        }}
      >
        <h1
          style={{
            color: "#2c3e50",
            fontSize: "2.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Restaurant Finder
        </h1>
        <p style={{ color: "#7f8c8d" }}>
          Discover the best dining experiences with AI
        </p>
      </header>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., 'Find vegan pizza under $15'"
            style={{
              flex: 1,
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={askAI}
            disabled={isLoading}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.2s",
              ":hover": {
                backgroundColor: "#2980b9",
              },
            }}
          >
            {isLoading ? "Searching..." : "Ask AI"}
          </button>
        </div>

        {response && (
          <div
            style={{
              backgroundColor: "#f0f7ff",
              padding: "1rem",
              borderRadius: "4px",
              borderLeft: "4px solid #3498db",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#2c3e50",
              }}
            >
              AI Recommendation
            </h3>
            <p
              style={{
                marginBottom: 0,
                color: "#34495e",
                lineHeight: "1.5",
              }}
            >
              {response}
            </p>
          </div>
        )}
      </div>

      <section
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2c3e50",
            marginTop: 0,
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #e1e4e8",
          }}
        >
          Available Restaurants
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {restaurants.map((r) => (
            <div
              key={r.id}
              style={{
                border: "1px solid #e1e4e8",
                borderRadius: "8px",
                padding: "1.25rem",
                transition: "transform 0.2s, box-shadow 0.2s",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <h3
                style={{
                  color: "#2c3e50",
                  marginTop: 0,
                  marginBottom: "0.5rem",
                }}
              >
                {r.name}
              </h3>

              <p
                style={{
                  color: "#7f8c8d",
                  marginBottom: "1rem",
                }}
              >
                {r.description}
              </p>

              <div style={{ marginBottom: "0.5rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#e8f4fc",
                    color: "#3498db",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    marginRight: "0.5rem",
                  }}
                >
                  {r.place}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#e8f4fc",
                    color: "#3498db",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                  }}
                >
                  {r.openTime}
                </span>
              </div>

              <div>
                <h4
                  style={{
                    color: "#2c3e50",
                    marginBottom: "0.5rem",
                    fontSize: "1rem",
                  }}
                >
                  Featured Dishes
                </h4>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.25rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  {r.bestDishes.map((dish, i) => (
                    <li
                      key={i}
                      style={{
                        listStyleType: "none",
                        backgroundColor: "#f0f7ff",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.85rem",
                      }}
                    >
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Ai;
