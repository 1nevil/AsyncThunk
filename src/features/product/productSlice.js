import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqProducts } from "./productApi";

const initialState = {
  products: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await reqProducts();

    // The value we return becomes the `fulfilled` action payload
    return response.data.products;
  }
);

export const productSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const selectCount = (state) => state.counter.value;

export default productSlice.reducer;
