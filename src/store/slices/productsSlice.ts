import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types';
import { RootState } from '../store';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const {data} = await axios.get<Product[]>('https://fakestoreapi.com/products');
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export const selectAllProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, (_: RootState, searchQuery: string, selectedCategory: string) => ({ searchQuery, selectedCategory })],
  (products, { searchQuery, selectedCategory }) => {
    let filtered = products;
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }
);

export const selectCategories = createSelector(
  [selectAllProducts],
  (products) => Array.from(new Set(products.map(product => product.category)))
);

export default productsSlice.reducer;