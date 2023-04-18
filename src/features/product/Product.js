import { useSelector, useDispatch } from "react-redux";
import "./Product.css";
import { useEffect } from "react";
import { fetchProducts } from "./productSlice";
import { addCartItems } from "../cart/cartSlice";

export function Product() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.product.products);
  return (
    <div className="product-container">
      <div>{/* <button aria-label="Decrement value"></button> */}</div>
      {products &&
        products.map((product) => {
          return (
            <>
              <div className="card">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  style={{ width: "100%" }}
                />
                <h1>{product.title}</h1>
                <p className="price">${product.price}</p>
                <p>Some text about the jeans..</p>
                <p>
                  <button
                    onClick={() => {
                      // console.log(product);
                      dispatch(addCartItems(product));
                    }}
                  >
                    Add to Cart
                  </button>
                </p>
              </div>
            </>
          );
        })}
    </div>
  );
}
