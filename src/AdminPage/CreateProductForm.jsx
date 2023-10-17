import React, { useState } from "react";
import axios from "axios";

export default function CreateProductForm() {
  const [newProduct, setNewProduct] = useState({
    description: "",
    price: 0,
    stock: 0,
    image: null,
  });

  const [formVisible, setFormVisible] = useState(false); // State to manage form visibility
  const [submitting, setSubmitting] = useState(false); // State to manage submission loading

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Set the loading state to true while submitting

    try {
      const formData = new FormData();
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("number_of_stocks", newProduct.stock);
      formData.append("productImage", newProduct.image);

      // Send a POST request to your server to create a new product
      const response = await axios.post(
        "http://localhost:3000/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response as needed
      console.log("Product created:", response.data);

      // Clear the form inputs
      setNewProduct({
        description: "",
        price: 0,
        stock: 0,
        image: null,
      });

      // Hide the form after successful submission
      setFormVisible(false);

      // Reload the page to display the updated product list
      window.location.reload();
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setSubmitting(false); // Set the loading state to false after submission
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible); // Toggle form visibility when the button is clicked
  };

  return (
    <div>
      <button
        onClick={toggleFormVisibility}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
      >
        {formVisible ? "Hide Form" : "Create Product"}
      </button>
      {formVisible && (
        <div className="fixed inset-0 flex items-center justify-center ">
          {/* Overlay */}
          <div className="absolute inset-0  pointer-events-none"></div>

          {/* Modal */}
          <div className="p-4 border border-gray-300 rounded-md bg-white">
            <h2 className="text-xl font-semibold">Create a New Product</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-medium">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="stock" className="block font-medium">
                  Stock:
                </label>
                <input
                  type="number"
                  id="stock"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block font-medium">
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.files[0] })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
                >
                  Create Product
                </button>
                <button
                  onClick={toggleFormVisibility}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md ml-2"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
