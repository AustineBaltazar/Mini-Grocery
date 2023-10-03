import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateProductForm from "./CreateProductForm";

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockCounts, setStockCounts] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios
      .get("http://localhost:3000/product")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        const initialStockCounts = {};
        response.data.forEach((product) => {
          initialStockCounts[product._id] = product.number_of_stocks;
        });
        setStockCounts(initialStockCounts);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  function increase(productId) {
    setStockCounts((prevStockCounts) => ({
      ...prevStockCounts,
      [productId]: prevStockCounts[productId] + 1,
    }));
  }

  function decrease(productId) {
    if (stockCounts[productId] > 0) {
      setStockCounts((prevStockCounts) => ({
        ...prevStockCounts,
        [productId]: prevStockCounts[productId] - 1,
      }));
    }
  }

  function deleteProduct(productId) {
    axios
      .delete(`http://localhost:3000/product/${productId}`, {
        data: { productId: productId },
      })
      .then(() => {
        // After successful deletion, remove the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }
  return (
    <>
      <div className="flex flex-col h-screen overflow-x-hidden">
        <header className="bg-white p-2 md:p-4 border-b border-gray-300 mt-8 shadow-xl">
          <h1 className="text-xl md:text-2xl font-bold text-black ml-2 md:ml-8">
            Stock
          </h1>
        </header>
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className=" p-2 md:p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search by ID or Description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 md:px-4 py-2 border border-gray-300 rounded-md shadow-md"
              />
              <button
                onClick={() => {
                  /* Add logic for searching */
                }}
                className="px-2 md:px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
              >
                Search
              </button>
              <CreateProductForm />
            </div>
          </div>

          {products
            .filter(
              (product) =>
                (product._id && product._id.includes(searchQuery)) ||
                (product.description &&
                  product.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
            )
            .map((product) => (
              <div
                key={product._id}
                className="w-128 h-145px flex items-center mb-4 rounded-lg border border-gray-300 bg-white shadow-md"
              >
                <img
                  src={`http://localhost:3000/${product.image}`} // Replace with the correct URL to fetch product images from your server
                  alt="Product Image"
                  className="w-32 h-32 mr-8 object-contain" // Adjust the class to fit the image size as needed
                />
                <div className="flex-grow text-left">
                  <table className="table-fixed w-full">
                    <thead>
                      <tr>
                        <th className="w-1/4 font-bold">Product ID</th>
                        <th className="w-1/4 font-bold">Description</th>
                        <th className="w-1/4 font-bold">Price</th>
                        <th className="w-1/4 font-bold">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{product._id}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td>{stockCounts[product._id]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex space-x-4 mt-4 mr-4">
                  <button
                    onClick={() => increase(product._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded text-xl shadow-md"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decrease(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded text-xl"
                  >
                    -
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded text-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
