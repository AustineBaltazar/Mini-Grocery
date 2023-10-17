import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NavAdmin() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState(null); // Index of the selected supplier
  const [newProductId, setNewProductId] = useState(""); // New product ID input
  const [isViewing, setIsViewing] = useState(false); // Flag to show/hide the view section
  const [isUpdating, setIsUpdating] = useState(false); // Flag to show/hide the update section
  const [showFullId, setShowFullId] = useState({}); // Object to track which IDs to show fully
  const [showFullName, setShowFullName] = useState({}); // Object to track which names to show fully

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = filteredData.filter((item) => {
      const values = Object.values(item).map((value) => value.toLowerCase());
      return values.some((val) => val.includes(query.toLowerCase()));
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/supplier")
      .then((response) => {
        console.log(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching supplier data:", error);
      });
  }, []);

  const handleToggleView = (index) => {
    setSelectedSupplierIndex((prevIndex) =>
      prevIndex === index ? null : index
    ); // Toggle the selected index
    setNewProductId(""); // Clear the input when toggling
    setIsUpdating(false); // Hide the update section when toggling
    setIsViewing((prevIsViewing) => !prevIsViewing); // Toggle the view section

    // Initialize showFullId and showFullName objects
    const updatedShowFullId = { ...showFullId };
    const updatedShowFullName = { ...showFullName };
    updatedShowFullId[index] = !prevIsViewing; // Toggle the ID visibility
    updatedShowFullName[index] = !prevIsViewing; // Toggle the supplier name visibility
    setShowFullId(updatedShowFullId);
    setShowFullName(updatedShowFullName);
  };

  const handleNewProductIdChange = (e) => {
    setNewProductId(e.target.value);
  };

  const handleToggleUpdate = () => {
    setIsUpdating(!isUpdating); // Toggle the update section
  };

  const handleUpdateProduct = () => {
    if (selectedSupplierIndex !== null) {
      const updatedData = [...filteredData];
      const supplierToUpdate = updatedData[selectedSupplierIndex];

      // Add the new product ID to the productsOffered array
      supplierToUpdate.productsOffered.push({ _id: newProductId });

      axios
        .put(
          `http://localhost:3000/supplier/update/${supplierToUpdate._id}`,
          supplierToUpdate
        )
        .then((response) => {
          console.log("Supplier updated:", response.data);
          setFilteredData(updatedData);
          setSelectedSupplierIndex(null);
          setIsUpdating(false); // Hide the update section after updating
          setShowFullId({});
          setShowFullName({});
          window.location.reload(); // Refresh the page
        })
        .catch((error) => {
          console.error("Error updating supplier data:", error);
        });
    }
  };

  const toggleShowFullId = (index) => {
    const updatedShowFullId = { ...showFullId };
    updatedShowFullId[index] = !updatedShowFullId[index];
    setShowFullId(updatedShowFullId);
  };

  const toggleShowFullName = (index) => {
    const updatedShowFullName = { ...showFullName };
    updatedShowFullName[index] = !updatedShowFullName[index];
    setShowFullName(updatedShowFullName);
  };

  return (
    <>
      <div className="flex flex-col">
        <header className="bg-white p-4 border-b border-gray-300 mt-8 shadow-xl">
          <h1 className="text-2xl font-bold text-black ml-8">Supplier</h1>
        </header>
        <div className="w-4/5 h-4/5 mx-auto my-4">
          <div className="flex items-center space-x-4 mb-4 mt-8">
            <input
              type="text"
              placeholder="Search by ID or Description"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-md"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md">
              Search
            </button>
          </div>

          <div className="w-full h-2/3 rounded-2xl border border-gray-300 bg-white shadow-md">
            <div className="flex justify-between font-bold text-lg mb-6">
              <h1 className="ml-4">ID</h1>
              <h1>Supplier Name</h1>
              <h1 className="ml-16">Business</h1>
              <h1 className="mr-8">Product Offered</h1>
            </div>
            {filteredData.map((item, index) => (
              <div className="flex justify-between mt-2" key={index}>
                <p className="ml-4">
                  {showFullId[index] ? item._id : `${item._id.slice(0, 5)}`}
                  <span
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() => toggleShowFullId(index)}
                  >
                    {showFullId[index] ? "hide" : "..."}
                  </span>
                </p>
                <p className="mr-24">
                  {showFullName[index]
                    ? item.supplierName
                    : `${item.supplierName.slice(0, 5)}`}
                  <span
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() => toggleShowFullName(index)}
                  >
                    {showFullName[index] ? "hide" : "..."}
                  </span>
                </p>
                <p className="mr-24">{item.business}</p>
                <div className="mr-8">
                  <button
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() => handleToggleView(index)}
                  >
                    {selectedSupplierIndex === index
                      ? isViewing
                        ? "Hide"
                        : "View"
                      : "View"}
                  </button>
                  {selectedSupplierIndex === index && isViewing && (
                    <div>
                      {item.productsOffered.map((product, productIndex) => (
                        <div key={productIndex}>
                          <p>{product.description}</p>
                        </div>
                      ))}
                      <button
                        className="text-blue-500 underline cursor-pointer"
                        onClick={handleToggleUpdate}
                      >
                        Update
                      </button>
                      {isUpdating && (
                        <div className="modal">
                          <div className="modal-content">
                            <input
                              type="text"
                              placeholder="Enter Product ID"
                              value={newProductId}
                              onChange={handleNewProductIdChange}
                              className="px-4 py-2 border border-gray-300 rounded-md shadow-md"
                            />
                            <button
                              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
                              onClick={handleUpdateProduct}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
