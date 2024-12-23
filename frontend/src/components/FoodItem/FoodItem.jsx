import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext' // Adjust the path as necessary

const FoodItem = ({id,name,price, description,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = React.useContext(StoreContext);
    
    const [imageUrl, setImageUrl] = React.useState(null);  // To store the image URL
    
    React.useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`${url}/api/food/${id}/image`);  // Fetch the image from the backend
                if (response.ok) {
                    const imageBlob = await response.blob();  // Convert to a Blob object
                    const imageObjectUrl = URL.createObjectURL(imageBlob);  // Create an object URL
                    setImageUrl(imageObjectUrl);  // Set the object URL as the image source
                } else {
                    console.error("Failed to fetch image");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };
        
        fetchImage();
    }, [id, url]);  // Re-run when `id` or `url` changes

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        {imageUrl ? (
          <img className='food-item-image' src={imageUrl} alt={name} />
        ) : (
          <p>Loading image...</p>  // Show loading text if the image is still being fetched
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
