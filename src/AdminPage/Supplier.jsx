import React, { useState } from "react";

export default function NavAdmin() {
  // Hardcoded data for demonstration
  const initialData = [
    {
      ID: "abcshh5hj45h4jh5h4jh5",
      SupplierName: "Alvin Lopez",
      Business: "Retailer",
      ProductOffered: "5013965773761",
    },
    {
      ID: "xyzshh5hj45h4jh5h4jh5",
      SupplierName: "Maria Rodriguez",
      Business: "Wholesaler",
      ProductOffered: "1234567890",
    },
    {
      ID: "123shh5hj45h4jh5h4jh5",
      SupplierName: "John Smith",
      Business: "Manufacturer",
      ProductOffered: "9876543210",
    },
    {
      ID: "456shh5hj45h4jh5h4jh5",
      SupplierName: "Emily Johnson",
      Business: "Distributor",
      ProductOffered: "2468135790",
    },
    {
      ID: "789shh5hj45h4jh5h4jh5",
      SupplierName: "Michael Brown",
      Business: "Importer",
      ProductOffered: "1357924680",
    },
    {
      ID: "101shh5hj45h4jh5h4jh5",
      SupplierName: "Olivia Davis",
      Business: "Exporter",
      ProductOffered: "8642097531",
    },
    {
      ID: "202shh5hj45h4jh5h4jh5",
      SupplierName: "Sophia Wilson",
      Business: "Wholesaler",
      ProductOffered: "1234987652",
    },
    {
      ID: "303shh5hj45h4jh5h4jh5",
      SupplierName: "Liam Martinez",
      Business: "Retailer",
      ProductOffered: "9876123458",
    },
    {
      ID: "404shh5hj45h4jh5h4jh5",
      SupplierName: "Ava Johnson",
      Business: "Distributor",
      ProductOffered: "1357924680",
    },
    {
      ID: "505shh5hj45h4jh5h4jh5",
      SupplierName: "Noah Davis",
      Business: "Manufacturer",
      ProductOffered: "8642097531",
    },
    {
      ID: "606shh5hj45h4jh5h4jh5",
      SupplierName: "Isabella Smith",
      Business: "Importer",
      ProductOffered: "1234987652",
    },
  ];

  // State to hold the filtered data based on search
  const [filteredData, setFilteredData] = useState(initialData);

  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the data based on the search query as the user types
    const filtered = initialData.filter((item) => {
      const values = Object.values(item).map((value) => value.toLowerCase());
      return values.some((val) => val.includes(query.toLowerCase()));
    });

    setFilteredData(filtered);
  };

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <header className="bg-white p-4 border-b border-gray-300 mt-8 shadow-xl">
          <h1 className="text-2xl font-bold text-black ml-8">
            Role Permission
          </h1>
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
              <h1>Business</h1>
              <h1 className="mr-8">Product Offered</h1>
            </div>
            {filteredData.map((item, index) => (
              <div className="flex justify-between mt-2" key={index}>
                <p className="ml-4">{item.ID}</p>
                <p className="mr-32">{item.SupplierName}</p>
                <p className="mr-32">{item.Business}</p>
                <p className="mr-8">{item.ProductOffered}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
