import React from "react";

function Cart({ cartItems, handleRemoveFromCart, onConfirmOrder }) {
  const total = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="w-80">
      <div className="bg-slate-50 p-6 rounded-3xl">
        <h2 className="text-2xl text-red-600 font-medium">
          Your Cart ({cartItems.length})
        </h2>
        {cartItems.length === 0 ? (
          // Empty Cart Layout
          <div className="flex justify-center items-center flex-col">
            <img
              src="./src/assets/images/illustration-empty-cart.svg"
              alt="empty cart"
            />
            <p className="text-gray-600">Your added items will appear here</p>
          </div>
        ) : (
          // Cart Items Layout
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col gap-2">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-red-700 font-medium">{item.quantity}x</p>
                    <p className="text-gray-600 text-sm">@${item.price}</p>
                    <p>${item.quantity * item.price}</p>
                  </div>
                </div>
                <button onClick={() => handleRemoveFromCart(item)}>
                  <div className="size-5 border flex items-center justify-center border-gray-300 rounded-xl">
                    <img
                      src="./src/assets/images/icon-remove-item.svg"
                      alt={`${item.name}`}
                    />
                  </div>
                </button>
              </div>
            ))}

            <div className="mt-6">
              <div className="font-semibold flex justify-between items-center p-2 m-2">
                <span>Order Total</span>
                <span className="font-bold text-2xl">${total}</span>
              </div>
              <div className="flex gap-2 justify-center items-center self-center bg-rose-50 h-12 rounded-lg">
                <img
                  src="./src/assets/images/icon-carbon-neutral.svg"
                  alt="Carbon-neutral svg"
                />
                <p>
                  This is a <span className="font-semibold">carbon-neutral</span>{" "}
                  delivery.
                </p>
              </div>
              <button
                className="w-full bg-orange-700 text-white rounded-full h-10 text-lg mt-8 hover:bg-orange-800"
                onClick={onConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;



