import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminReport() {
  const [reports, setReports] = useState([]);
  const [carts, setCarts] = useState([]);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/reports") // Adjust the URL to your actual API endpoint for reports
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });

    axios
      .get("http://localhost:3000/cart") // Adjust the URL to your actual API endpoint for cart
      .then((response) => {
        setCarts(response.data);
        // Initialize showDetails state to false for each cart item
        setShowDetails(
          Object.fromEntries(response.data.map((cart) => [cart._id, false]))
        );
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, []);

  const handleDeleteReport = async (reportId) => {
    try {
      await axios.delete(`http://localhost:3000/reports/${reportId}`);
      setReports((prevReports) =>
        prevReports.filter((report) => report._id !== reportId)
      );
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleDeleteCart = async (cartId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/delete/${cartId}`);
      setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== cartId));
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const toggleDetails = (cartId) => {
    setShowDetails((prevShowDetails) => ({
      ...prevShowDetails,
      [cartId]: !prevShowDetails[cartId],
    }));
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white p-4 border-b border-gray-300 mt-8 shadow-xl">
        <h1 className="text-2xl font-bold text-black ml-8">Report</h1>
      </header>

      <div className="container mx-auto mt-4 p-4 border border-gray-300 shadow-md bg-white">
        <h2 className="text-lg font-bold mt-2 mb-4">Reports List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {reports.map((report) => (
            <div key={report._id} className="border p-4 rounded-lg shadow-md">
              <p>
                <strong>STAFF Name:</strong> {report.name}
              </p>
              <p>
                <strong>Report Message:</strong> {report.reportMessage}
              </p>
              <p>
                <strong>Reported At:</strong> {report.createdAt}
              </p>
              <button
                onClick={() => handleDeleteReport(report._id)}
                className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-4 p-4 border border-gray-300 shadow-md bg-white">
        <h2 className="text-lg font-bold mt-2 mb-4">Receipt List</h2>

        {carts.map((cart) => (
          <div key={cart._id} className="border p-4 rounded-lg shadow-md">
            <h3
              className="text-lg font-bold cursor-pointer"
              onClick={() => toggleDetails(cart._id)}
            >
              Receipt ID: {cart._id}
            </h3>
            <button
              onClick={() => handleDeleteCart(cart._id)}
              className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-red-600"
            >
              Remove
            </button>
            {showDetails[cart._id] && (
              <div className="p-2 mt-2">
                <p>
                  <strong>Total Price:</strong> {cart.totalPrice}
                </p>
                <p>
                  <strong>Total Quantity</strong> {cart.quantity}
                </p>
                <h4>Cart Items:</h4>
                {cart.cart.map((item) => (
                  <div key={item._id} className="border p-2 rounded-md mt-2">
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Price:</strong> {item.price}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReport;
