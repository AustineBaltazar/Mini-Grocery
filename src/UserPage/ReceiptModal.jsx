import React from "react";

export default function ReceiptModal({ cart, cashInput, change }) {
  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Receipt</h2>
      <div className="mb-4">
        <div className="flex justify-between border-b pb-2">
          <div className="font-semibold">Description</div>
          <div className="font-semibold">Quantity</div>
          <div className="font-semibold">Price</div>
        </div>
        {cart.map((item) => (
          <div className="flex justify-between py-2" key={item.id}>
            <div>{item.description}</div>
            <div>{item.quantity}x</div>
            <div>₱{item.totalPrice.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Total:</div>
        <div>₱{calculateTotalPrice().toFixed(2)}</div>
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Cash Input:</div>
        <div>₱{parseFloat(cashInput).toFixed(2)}</div>
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Change:</div>
        <div>₱{parseFloat(change).toFixed(2)}</div>
      </div>
    </div>
  );
}
