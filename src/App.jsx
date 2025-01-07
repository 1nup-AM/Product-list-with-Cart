import React, { useState } from "react";
import Product from "./assets/components/Product.jsx";
import data from "/public/data.json";
import Cart from "./assets/components/Cart.jsx";
import Order from "./assets/components/Order.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const [resetCounter, setResetCounter] = useState(false); // For re-render
  const [productStates, setProductStates] = useState(
    data.map(() => ({
      quantity: 0,
      isActive: false,
    }))
  );

  const resetState = () => {
    setCart([]);
    setProductStates(
      data.map(() => ({
        quantity: 0,
        isActive: false,
      }))
    );
  };

  // Handle adding items to the cart
  const handleAddToCart = (product, quantityChange = 1, index) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.name === product.name);
      if (existingProduct) {
        // Update the quantity of an existing product in the cart
        const updatedCart = prevCart
          .map((item) =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + quantityChange }
              : item
          )
          .filter((item) => item.quantity > 0); // Remove items with zero quantity
        return updatedCart;
      } else if (quantityChange > 0) {
        // Add a new product to the cart
        return [...prevCart, { ...product, quantity: quantityChange }];
      }
      return prevCart;
    });

    // Ensure productStates is updated correctly
    setProductStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index
          ? {
              ...state,
              quantity: state.quantity + quantityChange,
              isActive: state.quantity + quantityChange > 0,
            }
          : state
      )
    );
  };

  // Handle removing items from the cart
  const handleRemoveFromCart = (productName) => {
    // Remove the item from the cart
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.name !== productName);
      return updatedCart;
    });

    // Reset the product state
    setProductStates((prevStates) =>
      prevStates.map((state, i) => ({
        ...state,
        quantity: 0, // Reset quantity to 0 when removed
        isActive: false, // Set isActive to false when removed
      }))
    );

    // Trigger resetCounter to reset the product state in Product components
    setResetCounter((prev) => !prev);
  };

  // State for popup visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Handle confirming order
  const handleConfirmOrder = () => {
    setIsPopupVisible(true);
  };

  // Handle closing popup
  const handleClosePopup = () => {
    setIsPopupVisible(false); // Close the popup
    resetState(); // Reset cart and product states when starting a new order
    setResetCounter((prev) => !prev); // Toggle counter for resetting state
  };

  return (
    <main className="bg-rose-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-left md:text-5xl font-semibold py-5">Desserts</h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8">
          {/* Products Section */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <Product
                  key={index}
                  image={item.image}
                  category={item.category}
                  name={item.name}
                  price={item.price}
                  quantity={productStates[index].quantity}
                  isActive={productStates[index].isActive}
                  onAddToCart={(product, quantityChange) =>
                    handleAddToCart(product, quantityChange, index)
                  }
                  resetCounter={resetCounter} // Keep this prop only in Product component
                />
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <Cart
              cartItems={cart}
              onRemoveFromCart={handleRemoveFromCart} // Pass the updated remove function
              onConfirmOrder={handleConfirmOrder}
            />
          </div>
        </div>
      </div>

      {/* Order Summary Popup */}
      <Order
        isVisible={isPopupVisible}
        items={cart}
        total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onClose={handleClosePopup}
      />
    </main>
  );
}

export default App;





