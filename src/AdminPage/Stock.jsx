import React from "react";

export default function Stock({ stockItems }) {
  return (
    <div>
      <div>
        <div>
          <h1>ADD STOCK</h1>
        </div>
        <div>
          <h1>SEARCH BAR</h1>
        </div>
      </div>

      <div>
        {stockItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}
