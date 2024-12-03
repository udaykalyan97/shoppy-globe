import { createSlice } from "@reduxjs/toolkit";

// Function to load cart items from localStorage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Function to save cart items to localStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // If the item already exists, increment the quantity by 1
        existingItem.quantity += 1;
      } else {
        // If it's a new item, set the quantity to the minimum order quantity
        state.items.push({
          ...action.payload,
          quantity: action.payload.minimumOrderQuantity,
        });
      }

      saveCartToLocalStorage(state.items);
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        const item = state.items[index];
        if (item.quantity > item.minimumOrderQuantity) {
          // Only decrease the quantity if it's above the minimum order quantity
          item.quantity -= 1;
        } else {
          // Remove the item entirely if the quantity is equal to the minimum order quantity
          state.items.splice(index, 1);
        }
      }

      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
