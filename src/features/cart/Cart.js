import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { deleteCartItem, updateCartqty } from "./cartSlice";

export function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const handleChange = (e, id) => {
    dispatch(updateCartqty({ id, change: { quantity: +e.target.value } }));
  };

  return (
    <div>
      {items.map((item) => (
        <>
          <div className="cart-item">
            <img className="img-fluid" src={item.thumbnail} alt="" />
            <div className="description">
              <p>{item.title}</p>
              <span>{item.brand}</span>
              <strong>${item.price}</strong>
            </div>
            <div className="quantity">
              Quantity
              <select
                value={item.quantity}
                onChange={(e) => handleChange(e, item.id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="close">
              <button onClick={() => dispatch(deleteCartItem(item.id))}>
                X
              </button>
            </div>
          </div>
        </>
      ))}
      <h5>
        Total Price :{" "}
        {items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </h5>
    </div>
  );
}
