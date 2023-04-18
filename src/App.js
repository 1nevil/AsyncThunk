import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./features/product/Product";
import { Cart } from "./features/cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "./features/cart/cartSlice";

function App() {
  const [showCart, setShowCart] = useState(false);
  const item = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => setShowCart(!showCart)}>
        {showCart ? "PRODUCT" : `CART ${item.length}`}
      </button>
      {showCart ? <Cart /> : <Product />}
    </div>
  );
}

export default App;
