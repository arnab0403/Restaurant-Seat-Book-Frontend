import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

function Loading() {

  return (
    <div className="absolute top-0 z-[991] h-[100vh] w-[100vw] bg-[#39393957] flex flex-col justify-center items-center">
      <LoaderCircle size={70} className="animate-spin" />
      <h1 className="text-[20px] mt-4">
       Fetching Location... 
      </h1>
    </div>
  );
}

export default Loading;
