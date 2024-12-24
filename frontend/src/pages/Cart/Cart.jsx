import React from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    React.useContext(StoreContext);

  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = React.useState({});

  React.useEffect(() => {
    food_list.forEach((item) => {
      if (item.image) {
        fetchImage(item.image);
      }
    });
  }, [food_list, url]);
  const fetchImage = async (image) => {
    try {
      const response = await axios.get(`${url}/api/food/image/${encodeURIComponent(image)}`, {
        responseType: "blob",
      });
      const imageBlob = response.data;
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [image]: imageObjectUrl,
      }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={imageUrls[item.image]} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${cartItems[item._id] * item.price}</p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed to CheckOut
          </button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, enter it here..</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;