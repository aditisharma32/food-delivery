import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = React.useContext(StoreContext);
  
  const [imageUrl, setImageUrl] = React.useState({});
  const [loading, setLoading] = React.useState(true);

React.useEffect(() => {
  const fetchImage = async (image) => {
    if (!image) {
      console.error("Image prop is undefined or null");
      setLoading(false);  // Set loading to false in case of missing image
      return;
    }
    try {
      const response = await axios.get(`${url}/api/food/image/${encodeURIComponent(image)}`, {
        responseType: "blob",
      });
      const imageBlob = response.data;
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrl((prevUrl) => ({
        ...prevUrl,
        [image]: imageObjectUrl,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setLoading(false);
    }
  };

  fetchImage(image);
}, [id, image, url]);

  const validImageUrl = imageUrl && imageUrl[image];

  if(loading){
    return (
      <div className="loading-food-item-container">
        <div className="loading-food-item"></div>
      </div>
    )
  }

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        {validImageUrl ? (
          <img className='food-item-image' src={validImageUrl} alt="Food Item" />
        ) : (
          <p>Image not available</p>
        )}

        {!cartItems?.[id] ? (
          <img
            src={assets.add_icon_white}
            alt=""
            className="add"
            onClick={() => addToCart?.(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeFromCart?.(id)}
            />
            <p>{cartItems?.[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart?.(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name || 'Unnamed Food Item'}</p>
          <img src={assets.rating_starts} alt="Rating Stars" />
        </div>
        <p className="food-item-desc">{description || 'No description available'}</p>
        <p className="food-item-price">${price ?? 'N/A'}</p>
      </div>
    </div>
  )
}

export default FoodItem
