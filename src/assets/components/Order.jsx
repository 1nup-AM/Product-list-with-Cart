import React from "react";

function Order({ isVisible, items, total, onClose }) {
  if (!isVisible) return null; // Do not render if not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Popup Content */}
      <div className="bg-white p-6 rounded-xl w-full max-w-prose shadow-lg text-center gap-6">
        <img src="./src/assets/images/icon-order-confirmed.svg" alt="Order svg" />
        <h2 className="text-3xl font-semibold mb-4 text-left">Order Confirmed!</h2>

        <p className="text-gray-600 mb-6 text-left">
          We hope you enjoy your food!
        </p>
        <div className="bg-rose-50 rounded-lg p-4">
          <div className="flex flex-col gap-2 mb-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-gray-700 border-b pb-1"
              >
                <img
                  src={item.image.thumbnail}
                  alt={item.name}
                  className="w-14 h-14"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-red-700 font-medium">{item.quantity}x</p>
                    <p className="text-gray-600 text-sm">@${item.price}</p>
                  </div>
                </div>
                <p className="flex justify-center items-center">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="font-semibold flex justify-between text-lg mt-4">
              <span>Order Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Start New Order Button */}
        <button
          className="bg-orange-700 w-full text-white px-4 py-2 rounded-3xl hover:bg-orange-800 font-semibold"
          onClick={onClose} // Trigger the popup close
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default Order;



