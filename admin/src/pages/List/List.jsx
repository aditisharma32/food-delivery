import React, { useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Error while fetching the food list");
      console.error("Fetch List Error:", error);
    }
  };

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

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error while removing food item");
      console.error("Remove Food Error:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    list.forEach((item) => {
      if (item.image) {
        fetchImage(item.image);
      }
    });
  }, [list]);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <div className="loading-list-item-container">
              {!loading ? (
                <img src={imageUrl[item.image]} alt="" />
              ) : (
                
                  <div className="loading-list-item"></div>
                )}
                </div>

              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
