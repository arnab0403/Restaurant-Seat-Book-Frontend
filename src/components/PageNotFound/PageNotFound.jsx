import React from "react";
import Navbar from "../Navbar/Navbar";

function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-[100px] font-bold text-[#F49B33]">404</h1>
        <h2 className="text-[24px] font-semibold text-gray-700">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mt-2 text-center max-w-[400px]">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a className="mt-6 px-6 py-3 bg-[#F49B33] text-white rounded-md shadow-md hover:bg-[#d9822b] transition-all duration-300">
          Go Back to Home
        </a>
      </div>
    </>
  );
}

export default PageNotFound;
