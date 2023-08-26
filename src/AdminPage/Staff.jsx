import React from "react";
import Pic from "/img/profile-pic-removebg-preview.png";

function Staff() {
  const items = [
    "Partnership Data",
    "Time in Business",
    "Product Offered",
    "Contacts",
    "Schedule",
    "Permission Level",
  ];

  const itemElements = items.map((item, index) => (
    <h1 key={index} className="pt-4 text-center">
      {item}
    </h1>
  ));

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-200">
      <header className="bg-white w-full max-w-screen-4xl p-4 ml-8 rounded-lg mt-7 shadow-md">
        <h1 className="text-xl font-bold ml-64" style={{ fontFamily: "Inter" }}>
          PROFILE
        </h1>
      </header>

      <div className="mt-24 mr-180">
        <div className="flex flex-row items-center">
          <img
            src={Pic}
            alt="Profile"
            className="w-32 h-32 rounded-lg shadow-lg"
          />

          <div className="mt-4 text-left pl-16">
            <p className="text-sm">ID: abc5oy09iopeorErox</p>
            <p className="text-2xl font-bold">Name: Jose Matalo</p>
            <p className="text-lg">Role: Supplier</p>
            <p className="text-lg text-red-500">Last Active 2 days ago</p>
          </div>
        </div>

        <div className="mt-4 grid grid-rows-2 grid-cols-3 gap-6 font-bold">
          {itemElements}
        </div>
      </div>
    </div>
  );
}

export default Staff;
