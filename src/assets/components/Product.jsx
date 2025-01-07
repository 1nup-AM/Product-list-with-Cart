import React, { useState, useEffect } from "react";

function Product({ image, name, category, price, onAddToCart, resetCounter }) {
  const [showCounter, setShowCounter] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isActive, setIsActive] = useState(false); // Track active border

  useEffect(() => {
    if (resetCounter) {
      setShowCounter(false); // Reset counter visibility
      setQuantity(1); // Reset quantity to initial value
      setIsActive(false); // Reset border state
    }
  }, [resetCounter]);

  const handleAddToCart = () => {
    setShowCounter(true);
    setIsActive(true); // Activate border
    onAddToCart({ image, name, category, price }, quantity); // Notify parent with the quantity
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart({ image, name, category, price }, 1); // Notify parent of the increase
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart({ image, name, category, price }, -1); // Notify parent about decrease
    } else {
      setShowCounter(false); // Hide counter when quantity reaches 0
      setIsActive(false);
      onAddToCart({ image, name, category, price }, -quantity); // Remove item from cart
    }
  };

  return (
    <div className="flex flex-col w-full gap-7">
      <div
        className={`relative border-2 rounded-xl ${
          isActive ? "border-orange-500" : "border-transparent"
        } transition-colors duration-300`}
      >
        <picture>
          <source srcSet={image.desktop} media="(min-width: 1024px)" />
          <source srcSet={image.tablet} media="(min-width: 768px)" />
          <img src={image.mobile} alt={name} className="rounded-xl" />
        </picture>

        {/* Add to cart or Counter */}
        <div className="absolute left-1/2 -bottom-5 w-full max-w-40 -translate-x-2/4">
          {!showCounter ? (
            <button
              className="flex justify-center items-center border-amber-900 border rounded-full w-full p-3 gap-2 max-w-40 bg-white hover:border-red-600 hover:text-red-600"
              onClick={handleAddToCart}
            >
              <img
                src="./images/icon-add-to-cart.svg"
                alt="cart-image"
              />
              <p className="font-semibold">Add to Cart</p>
            </button>
          ) : (
            <div className="flex justify-around items-center rounded-full w-full p-3 gap-2 max-w-40 bg-orange-700">
              <button
                className="flex justify-center items-center border border-white size-5 rounded-full hover:bg-orange-600 active:border-black focus:outline transition-all"
                onClick={handleDecrease}
              >
                <img
                  src="./images/icon-decrement-quantity.svg"
                  alt="decrement svg"
                />
              </button>
              <span className="text-white">{quantity}</span>
              <button
                className="flex justify-center items-center border border-white size-5 rounded-full hover:bg-orange-600 active:border-black focus:outline transition-all"
                onClick={handleIncrease}
              >
                <img
                  src="./images/icon-increment-quantity.svg"
                  alt="increment svg"
                />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Product Info */}
      <div>
        <p className="text-amber-900">{category}</p>
        <h1 className="font-bold">{name}</h1>
        <p className="text-red-700 font-medium">${price}</p>
      </div>
    </div>
  );
}

export default Product;





