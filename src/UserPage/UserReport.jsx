import React, { useState } from "react";
import axios from "axios";

export default function UserReport() {
  const [name, setName] = useState("");
  const [reportMessage, setReportMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JavaScript Date object for the createdAt field
    const createdAt = new Date().toISOString(); // Generates the date and time in ISO 8601 format

    // Send the report data to your server (API) to save it in the database
    const reportData = { name, reportMessage, createdAt };

    axios
      .post("http://localhost:3000/reports/add", reportData) // Adjust the URL to your actual API endpoint
      .then((response) => {
        // Handle success (e.g., show a success message or clear the form)
        console.log("Report submitted successfully:", response.data);

        // Clear the form fields
        setName("");
        setReportMessage("");
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error("Error submitting report:", error);
      });
  };

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <header className="bg-white p-2 md:p-4 border-b border-gray-300 mt-8 shadow-xl">
        <h1 className="text-xl md:text-2xl font-bold text-black ml-2 md:ml-8">
          Report
        </h1>
      </header>

      <div className="container mx-auto mt-4 p-4 border border-gray-300 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full md:w-64 border rounded-lg p-2"
              placeholder="Input Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Report Message:
            </label>
            <textarea
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
              className="w-full h-64 border rounded-lg p-2"
              placeholder="Stock Report"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
