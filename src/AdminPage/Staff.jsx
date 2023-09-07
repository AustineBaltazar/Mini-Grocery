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
    <div>
      <header>
        <h1>PROFILE</h1>
      </header>

      <div>
        <div>
          <img src={Pic} alt="Profile" />

          <div>
            <p>ID: abc5oy09iopeorErox</p>
            <p>Name: Jose Matalo</p>
            <p>Role: Supplier</p>
            <p>Last Active 2 days ago</p>
          </div>
        </div>

        <div>{itemElements}</div>
      </div>
    </div>
  );
}

export default Staff;
