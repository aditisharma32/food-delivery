import React from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const {
    cartItems,
    food_list = [],
    removeFromCart,
    getTotalCartAmount,
    url,
  } = React.useContext(StoreContext) || {}; // Default to an empty object to avoid destructuring null/undefined

  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (Array.isArray(food_list)) {
      food_list.forEach((item) => {
        if (item?.image) {
          fetchImage(item.image);
        }
      });
    }
  }, [food_list, url]);

  const fetchImage = async (image) => {
    try {
      const response = await axios.get(
        `${url}/api/food/image/${encodeURIComponent(image)}`,
        {
          responseType: "blob",
        }
      );
      const imageBlob = response.data;
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [image]: imageObjectUrl,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setLoading(false);
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
        {Array.isArray(food_list) &&
          food_list.map((item) => {
            const quantity = cartItems?.[item?._id] || 0; // Safe access and default to 0
            if (quantity > 0) {
              return (
                <div key={item?._id || Math.random()}>
                  <div className="cart-items-title cart-items-item">
                    <div className="loading-cart-item-container">
                      {loading ? (
                        <div className="loading-cart-item"></div>
                      ) : (
                        <img
                          src={imageUrls[item?.image] || ""}
                          alt="Food Item"
                          onError={(e) => (e.target.src = "default_image_url")} // Fallback to a default image
                        />
                      )}
                    </div>

                    <p>{item?.name || "Unnamed Item"}</p>
                    <p>${item?.price ?? "N/A"}</p>
                    <p>{quantity}</p>
                    <p>${quantity * (item?.price ?? 0)}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart?.(item?._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <hr />
                </div>
              );
            }
            return null; // Skip rendering for items not in the cart
          })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount?.() ?? 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount?.() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>
                $
                {getTotalCartAmount?.() === 0
                  ? 0
                  : (getTotalCartAmount?.() ?? 0) + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate?.("/order")}>
            Proceed to CheckOut
          </button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, enter it here..</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
