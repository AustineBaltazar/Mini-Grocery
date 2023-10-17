import React from "react";
import ReceiptModal from "./ReceiptModal";

export default function SuccessModal({ onClose, cart, cashInput, change }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded shadow-md w-96">
        <span
          className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl font-semibold">Success</h2>
        <p>Your order has been successfully processed.</p>
        <ReceiptModal cart={cart} cashInput={cashInput} change={change} />
      </div>
    </div>
  );
}
