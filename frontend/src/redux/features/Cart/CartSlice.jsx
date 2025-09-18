import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each: { id, name, price, image, quantity }
  currency: "₦",
};

const findId = (p) => p._id || p.id;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const id = findId(payload);
      const price = Number(payload.price) || 0;
      const image =
        payload.image ||
        payload.thumbnail ||
        (Array.isArray(payload.images) ? payload.images[0] : undefined);

      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id,
          name: payload.name,
          price,
          image,
          quantity: 1,
        });
      }
    },
    updateQuantity: (state, { payload }) => {
      const { id, delta } = payload; // delta: +1 or -1
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      item.quantity += delta;
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
    removeFromCart: (state, { payload }) => {
      const id = payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

// selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((t, i) => t + i.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((t, i) => t + i.price * i.quantity, 0);
export const selectCartCurrency = (state) => state.cart.currency;

export default cartSlice.reducer;
