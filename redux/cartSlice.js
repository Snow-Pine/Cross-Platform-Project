import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.title === item.title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.title === item.title);
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const { updateCart, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;