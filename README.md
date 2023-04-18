### AsyncThunk Implimantation

##### Why AsyncThunk

- Its provide some extra features for the api requests.
- Inbuilt support inside redux so no need to install extarnal middlewares.
- Internally use emmer.js so no need to make copy of original state.
- That's why no need to use of mutation. ex : [...oldState,newValue] instead of oldstate.push(newValue).

#### create feature/api.js

- Sapreate file for network request.

```
    export function fetchItems() {
      return axios.[get,post,delete,patch]("http://localhost:8080/cart");
    }
```

#### import **AsyncThunk and ApiFunction** in Feature/slice.js

```
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "./api.js";

```

### Initialization

```
const initialState = {
  items: [],
  status: "idle",
};

```

### Fetching data using createAsyncThunk function

```
export const fetchCartItems = createAsyncThunk("cart/fetchItems", async () => {
  const response = await fetchItems();

  // The value we return becomes the `fulfilled` action payload
  // same line for the pending , rejeted
  return response.data;
});
```

### Reducers , Builder function and action slice

- Builder callback provide some extra features for api.
- Like Fullfiled,Rejected,Pending.
- So we directly set variable inside builder function

```
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
      }).addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })

  },
});

export default carttSlice.reducer;

```

##### Same toolkit binding with react.

### ESLint installation in vite app

[Eslint DEV.to Blog Post](https://dev.to/bushblade/add-eslint-to-a-react-vite-project-4pib)
