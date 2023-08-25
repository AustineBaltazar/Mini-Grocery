import React from "react";

export default function Stock({ stockItems }) {
  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-200">
      <div className="flex flex-row justify-between w-full mt-7">
        <div className="bg-white w-63 p-4 rounded-lg shadow-md ml-72">
          <h1 className="text-xl font-bold" style={{ fontFamily: "Inter" }}>
            ADD STOCK
          </h1>
        </div>
        <div className="bg-white w-63 p-4 rounded-lg shadow-md mr-40 px-64">
          <h1 className="text-xl font-bold" style={{ fontFamily: "Inter" }}>
            SEARCH BAR
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 mt-20">
        {stockItems.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg ml-40 shadow-md px-192 py-14"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
