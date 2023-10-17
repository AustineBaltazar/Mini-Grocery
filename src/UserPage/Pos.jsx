import React, { useState, useEffect } from "react";
import axios from "axios";
import SuccessModal from "./SuccessModal";

export default function PointOfSale() {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({}); // Store quantities for each product
  const [cashInput, setCashInput] = useState(0);
  const [change, setChange] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function openSuccessModal() {
    setShowSuccessModal(true);
  }
  function closeSuccessModal() {
    setShowSuccessModal(false);
  }

  function handleCheckout() {
    // Calculate the total quantity and total price of items in the cart
    const { grandTotal, itemCount } = calculateGrandTotalAndItemCount();

    // Convert cash input to a number
    const cash = parseFloat(cashInput);

    // Validate that cash is a valid number
    if (isNaN(cash) || cash < 0) {
      alert("Invalid cash amount");
      return;
    }

    // Calculate the change
    const changeAmount = cash - grandTotal;

    if (changeAmount < 0) {
      alert("Insufficient cash");
      return;
    }

    // Prepare the cart data to send to the server for checkout
    const cartData = {
      quantity: itemCount,
      totalPrice: grandTotal,
      cart: cart.map((cartItem) => ({
        _id: cartItem.id,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice,
      })),
    };

    // Send a POST request to initiate the checkout process
    axios
      .post("http://localhost:3000/cart/add", cartData)
      .then((response) => {
        // Handle successful checkout (optional)
        console.log("Checkout successful", response.data);

        // Calculate and set the change
        setChange(changeAmount);

        // Clear the cart in the frontend
      })
      .catch((error) => {
        // Handle error during checkout (optional)
        console.error("Error during checkout", error);
      });

    openSuccessModal();
  }

  // useEffect to fetch products from your backend
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products
  function fetchProducts() {
    // Make an API request to fetch products from your backend
    axios
      .get("http://localhost:3000/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  // Function to handle adding a product to the cart
  function addToCart(product) {
    const selectedQuantity = productQuantities[product._id] || 1; // Use the selected quantity or default to 1

    // Check if the selected quantity is greater than the available stock
    if (selectedQuantity > product.number_of_stocks) {
      alert("Insufficient stock for this product");
      return;
    }

    // Calculate the total price for this product based on the quantity
    const totalPrice = product.price * selectedQuantity;

    const cartItem = {
      id: product._id, // Store the product ID
      description: product.description, // Store the product description
      price: product.price, // Store the product price
      quantity: selectedQuantity, // Store the selected quantity
      totalPrice: totalPrice, // Add the total price to the cart item
    };

    // Make an API request to update the stock quantity in the database
    axios
      .put(`http://localhost:3000/product/${product._id}`, {
        number_of_stocks: product.number_of_stocks - selectedQuantity,
      })
      .then((response) => {
        // The stock quantity has been updated in the database, add the product to the cart
        setCart([...cart, cartItem]);
      })
      .catch((error) => {
        console.error("Error updating stock: ", error);
      });
  }

  // Function to handle increasing the quantity for a product
  function increaseQuantity(productId) {
    const updatedQuantities = {
      ...productQuantities,
      [productId]: (productQuantities[productId] || 0) + 1,
    };
    setProductQuantities(updatedQuantities);
  }

  // Function to handle decreasing the quantity for a product
  function decreaseQuantity(productId) {
    if (productQuantities[productId] > 1) {
      const updatedQuantities = {
        ...productQuantities,
        [productId]: productQuantities[productId] - 1,
      };
      setProductQuantities(updatedQuantities);
    }
  }

  // Function to handle searching for products
  function handleSearch() {
    // Filter products based on the search query
    const filteredProducts = products.filter(
      (product) =>
        (product._id && product._id.includes(searchQuery)) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Update the displayed product list
    setProducts(filteredProducts);
  }

  function calculateGrandTotalAndItemCount() {
    let grandTotal = 0;
    let itemCount = 0;

    for (const cartItem of cart) {
      grandTotal += cartItem.price * cartItem.quantity;
      itemCount += cartItem.quantity;
    }

    return { grandTotal, itemCount };
  }

  function handleClearCart() {
    // Clear the cart and product quantities
    setCart([]);
    setProductQuantities({});
    // Optionally, you can clear the cash input and change as well.
    setCashInput(0);
    setChange(0);
  }

  function handleCheckTotal() {
    // Calculate the total quantity and total price of items in the cart
    const { grandTotal } = calculateGrandTotalAndItemCount();

    // Convert cash input to a number
    const cash = parseFloat(cashInput);

    // Validate that cash is a valid number
    if (isNaN(cash) || cash < 0) {
      alert("Invalid cash amount");
      return;
    }

    // Calculate the change
    const changeAmount = cash - grandTotal;

    if (changeAmount < 0) {
      alert("Insufficient cash");
      return;
    }

    // Set the calculated change
    setChange(changeAmount);
  }

  // Render GrandTotal and Item Count
  function renderGrandTotalAndItemCount() {
    const { grandTotal, itemCount } = calculateGrandTotalAndItemCount();

    return (
      <div>
        <div>
          <span className="text-2xl">Grand Total:</span>
          <span className="ml-2">₱{grandTotal.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-2xl">Item Count:</span>
          <span className="ml-2">{itemCount.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-screen ">
        <header className="bg-white p-2 md:p-4 border-b border-gray-300 mt-8 shadow-xl">
          <h1 className="text-xl md:text-2xl font-bold text-black ml-2 md:ml-8">
            POS
          </h1>
        </header>
        <div className="container mx-auto flex flex-col min-h-screen items-center pt-8 overflow-y-auto">
          <div className="bg-white shadow-lg rounded-lg w-full sm:flex-row flex flex-col">
            <div className="w-full sm:w-1/2 p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by ID or Description"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white w-full px-4 py-2 rounded-md mt-2"
                >
                  Search
                </button>
              </div>

              <div className="h-[570px] overflow-y-auto">
                <div>
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className={`${
                        (product._id && product._id.includes(searchQuery)) ||
                        (product.description &&
                          product.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
                          ? "block"
                          : "hidden"
                      } border border-gray-300 p-3 mb-3 rounded-md`}
                    >
                      <span>{product.description}</span>
                      <span> ₱{product.price}</span>

                      <div className="flex items-center mt-2 justify-between">
                        <div>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-blue-500 text-white p-2 pl-6 pr-6 rounded-md ml-2"
                          >
                            Add to List
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => decreaseQuantity(product._id)}
                            className="bg-red-500 text-white p-2 pl-4 pr-3 mr-2 rounded-md"
                          >
                            -
                          </button>
                          <span>{productQuantities[product._id] || 1}</span>
                          <button
                            onClick={() => increaseQuantity(product._id)}
                            className="bg-blue-500 text-white p-2 pl-4 pr-3 ml-2 rounded-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 p-4">
              <h1 className="text-2xl font-bold mb-2">List</h1>
              {cart.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="border border-gray-300 p-3 mb-3 rounded-md"
                >
                  <span>{cartItem.description}</span>
                  <span className="ml-2">
                    Price: ₱{cartItem.price * cartItem.quantity}
                  </span>
                  <span className="ml-2">Quantity: {cartItem.quantity}</span>
                </div>
              ))}
            </div>

            <div className="w-full sm:w-1/2 p-4">
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="cashInput"
                    className="block text-2xl font-bold pt-3"
                  >
                    Cash:
                  </label>
                  <input
                    type="number"
                    id="cashInput"
                    value={cashInput}
                    onChange={(e) => setCashInput(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mt-3">
                  <button
                    onClick={handleCheckout}
                    className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
                  >
                    CHECK OUT
                  </button>
                  {showSuccessModal && (
                    <SuccessModal
                      onClose={closeSuccessModal}
                      cart={cart}
                      cashInput={cashInput}
                      change={change}
                    />
                  )}
                </div>
                <div className="mt-3">
                  <button
                    onClick={handleClearCart}
                    className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
                  >
                    VOID
                  </button>
                </div>
                <div className="mt-3">
                  <button
                    onClick={handleCheckTotal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                  >
                    CHECK TOTAL
                  </button>
                </div>
                <div className="mt-12 mb-2 text-3xl">
                  <span>Change: ₱{change.toFixed(2)}</span>
                </div>
                {renderGrandTotalAndItemCount()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
