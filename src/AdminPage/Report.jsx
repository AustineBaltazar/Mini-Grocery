import React from "react";

function Report({ monthlySales, todaysReport, data }) {
  return (
    <div>
      <header>
        <h1>DASHBOARD</h1>
      </header>

      <div>
        <div>
          <div>{monthlySales}</div>
          <div>{todaysReport}</div>
        </div>

        <div>
          {data.map((item, index) => (
            <div key={index}>{item.label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Report;
