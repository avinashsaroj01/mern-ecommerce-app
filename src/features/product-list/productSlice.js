import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchAllProductsByFilter } from "./productAPI";

const initialState = {
  products: [],
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    console.log("api response....." + JSON.stringify(response.data));
    return response.data;
  }
);

export const fetchAllProductsByFilterAsync = createAsyncThunk(
  "products/fetchProductsByFilter",
  async (filter) => {
    console.log("Filter...." + JSON.stringify(filter));
    const response = await fetchAllProductsByFilter(filter);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productListSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.products = [];
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.products = [];
      })
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        console.log("payload recived..." + JSON.stringify(action.payload));
        state.products = action.payload;
      });
  },
});

export const { increment } = productListSlice.actions;

export const getAllProducts = (state) => state.product.products;

export default productListSlice.reducer;
