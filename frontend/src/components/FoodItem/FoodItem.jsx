import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = React.useContext(StoreContext);
  
  const [imageUrl, setImageUrl] = React.useState({});

  React.useEffect(() => {
    const fetchImage = async (image) => {
      // Check if the image prop is undefined or null
      if (!image) {
        console.error("Image prop is undefined or null");
        return;
      }

      // Check if the URL is valid
      if (!url) {
        console.error("URL is undefined or null");
        return;
      }

      console.log("Fetching image for:", image);

      try {
        // Attempt to fetch the image
        const response = await axios.get(`${url}/api/food/image/${encodeURIComponent(image)}`, {
          responseType: "blob",
        });

        // Check if the response is valid
        if (!response || !response.data) {
          console.error("Invalid response from the server:", response);
          return;
        }

        // Create a URL object for the image
        const imageBlob = response.data;
        const imageObjectUrl = URL.createObjectURL(imageBlob);

        // Check if imageObjectUrl is a valid URL
        if (!imageObjectUrl || typeof imageObjectUrl !== 'string' || !imageObjectUrl.startsWith('blob:')) {
          console.error("Invalid image URL generated:", imageObjectUrl);
          return;
        }
        console.log("Image URL successfully created for:", imageObjectUrl);
        // Update the image URL in the state
        setImageUrl((prevUrl) => {
          // Check if the previous state is valid
          if (!prevUrl) {
            console.error("Previous URL state is invalid");
            return;
          }

          return {
            ...prevUrl,
            [image]: imageObjectUrl,
          };
       });

        console.log("Image URL successfully created and set for:", image);

      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage(image);
  }, [id, image, url]);

  // Check if image URL is valid
  const validImageUrl = imageUrl && imageUrl[image];

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        {validImageUrl ? (
          <img className='food-item-image' src={validImageUrl} alt="Food Item" />
        ) : (
          <p>Image not available</p>
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
