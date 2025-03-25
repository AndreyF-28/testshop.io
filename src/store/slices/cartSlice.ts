import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { RootState } from '../store';
import { toast } from 'react-toastify';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        toast.success(`"${action.payload.title}" добавлен (${existingItem.quantity} шт.)`);
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
        toast.success(`"${action.payload.title}" добавлен в корзину`);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          toast.success(`Удалён 1 "${existingItem.product.title}" (осталось ${existingItem.quantity})`);
        } else {
          state.items = state.items.filter(item => item.product.id !== action.payload);
          toast.success(`"${existingItem.product.title}" удалён из корзины`);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalPrice = (state: RootState) => 
  state.cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

export default cartSlice.reducer;