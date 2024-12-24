import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = React.useContext(StoreContext);
  
  const [imageUrl, setImageUrl] = React.useState({});

React.useEffect(() => {
  const fetchImage = async () => {
    try {
      const response = await axios.get(`${url}/api/food/image/${encodeURIComponent(image)}`, {
        responseType: "blob",
      });
      const imageBlob = response.data;
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  fetchImage();
}, [id, image, url]);


  return (
    <div className='food-item'>
      <div className="food-item-img-container">
       {imageUrl ? (
          <img className='food-item-image' src={imageUrl} alt="" />
        ) : (
          <p></p>
        )}
        {!cartItems[id]
            ?<img src={assets.add_icon_white} alt="" className='add' onClick={()=>addToCart(id)}/>
            :<div className='food-item-counter'>
                <img src={assets.remove_icon_red} alt="" onClick={()=>removeFromCart(id)}/>
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} alt="" onClick={()=>addToCart(id)}/>
              </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
