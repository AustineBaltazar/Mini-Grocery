import React from "react";

function Admin() {
  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-200">
      <header className="bg-white w-full max-w-screen-4xl p-4 ml-8 rounded-lg mt-7 shadow-md">
        <h1 className="text-xl font-bold ml-64" style={{ fontFamily: "Inter" }}>
          SUPPLIER
        </h1>
      </header>

      <div className="mt-4" style={{ fontFamily: "Inter" }}>
        <div className="bg-white rounded-lg shadow-md p-4 text-xl font-bold ml-192 mt-8">
          SEARCH BAR
        </div>
      </div>

      <div className="mt-4 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-2xl font-bold px-100 py-72 mt-8 ml-48">
          {/* Content for the big container */}
          SUPPLIER INFO HERE
        </div>
      </div>
    </div>
  );
}

export default Admin;
