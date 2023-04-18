import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems, addItem, updateItem, deleteItem } from "./cartApi";

const initialState = {
  items: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchCartItems = createAsyncThunk("cart/fetchItems", async () => {
  const response = await fetchItems();

  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

//item == product
export const addCartItems = createAsyncThunk("cart/addItem", async (item) => {
  const { id, title, price, thumbnail, brand } = item;
  const response = await addItem({
    id,
    title,
    price,
    thumbnail,
    brand,
    qty: 1,
  });

  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async (id) => {
    const response = await deleteItem(id);
    console.log(response);
    // The value we return becomes the `fulfilled` action payload
    return id;
  }
);

export const updateCartqty = createAsyncThunk(
  "cart/updateCartQuentity",
  async ({ id, change }) => {
    const response = await updateItem(id, change);
    console.log("🚀 ~ file: cartSlice.js:51 ~ id, change:", id, change);
    console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    //return updated object
  }
);

// we can also make for pending requests and rejected requests
export const carttSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(addCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateCartqty.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default carttSlice.reducer;
