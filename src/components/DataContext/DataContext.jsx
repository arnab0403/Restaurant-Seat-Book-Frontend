import React, { use, useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "universal-cookie";
import { getAuthDetails } from "../../api/api";

export const DataContext = createContext();
function DataProvider({ children }) {
  const [navState, setNavState] = useState("home");
  const [location, setLocation] = useState(null);
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await getAuthDetails(); // backend reads jwt cookie
        console.log("Auth response:", response);

        if (response.status === "success") {
          if (!user) {
            setUser(response.user);
          }
        } else {
          setUser(null);
        }

      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      }
    };

    checkToken();
  }, []);




  return (
    <DataContext.Provider
      value={{ navState, setNavState, location, setLocation, user, setUser }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
