import React from "react";
import { User, Check, Pencil, Trash2, Plus } from "lucide-react";
function SlotManage() {
  return (
    <div className="grid grid-flow-col auto-cols-[250px]  overflow-y-scroll bg-[white] scrollC">
      {/* Example Components */}
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="">
          <h2 className="text-lg font-bold border-b border-[#F49B33] text-center">
            {index + 1}:00 PM
          </h2>
          <div className="border-b border-l p-[20px]">
            <div>
              <div>
                <p>Soumik Maity</p>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <p className="flex">
                    <User />
                    <p>4</p>
                  </p>
                  <p className="flex">
                    <User />
                    <p>4</p>
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <p className="w-[25px] h-[25px] bg-green-500 rounded-[50%] flex justify-center items-center">
                    <Check color="white" />
                  </p>
                  <p>
                    <Pencil color="#F49B33" />
                  </p>
                  <p>
                    <Trash2 color="red" />
                  </p>
                </div>
              </div>
              <button className="bg-[#F49B33] font-medium text-white h-[40px] w-[140px] mt-[10px] rounded-[5px] flex justify-center items-center">
                <Plus />
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SlotManage;
