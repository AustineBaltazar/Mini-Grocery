import React from "react";

function Report() {
  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-200">
      <header className="bg-white w-full max-w-screen-4xl p-4 ml-8 rounded-lg mt-7 shadow-md">
        <h1 className="text-xl font-bold ml-64" style={{ fontFamily: "Inter" }}>
          DASHBOARD
        </h1>
      </header>

      <div className="mt-14 ml-44">
        <div className="grid grid-cols-2 gap-32 ">
          <div className="bg-white rounded-lg shadow-xl px-80 py-44">
            Monthly sales here
          </div>
          <div className="bg-white rounded-lg shadow-xl px-80 py-44">
            Todays Report
          </div>
        </div>

        <div className="mt-16 grid grid-cols-4 gap-16">
          <div className="bg-white rounded-lg shadow-xl px-12 py-12">
            TOTAL CUSTOMER
          </div>
          <div className="bg-white rounded-lg shadow-xl px-12 py-12">
            TOTAL SUPPLIER
          </div>
          <div className="bg-white rounded-lg shadow-xl px-12 py-12">
            TOTAL PRODUCT
          </div>
          <div className="bg-white rounded-lg shadow-xl px-12 py-12">
            ADD PRODUCT
          </div>
          <div className="bg-white rounded-lg shadow-xl px-12 py-12">
            SALES REPORT
          </div>
          <div className="bg-white rounded-lg shadow-xl px-12 py-12">
            STACK REPORT
          </div>
          <div className="bg-white rounded-lg shadow-xl px-12 py-12">
            PURCHASE REPORT
          </div>
          <div className="bg-white rounded-lg shadow-2xl px-12 py-12">
            TODAYS REPORT
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
