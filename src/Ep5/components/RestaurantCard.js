import { CDN_URL } from "../utils/constants.js";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData?.data;
  return (
    <div className="res-card">
      <img className="card" alt="res-logo" src={CDN_URL + cloudinaryImageId} />
      <div className="card-content">
        <h3>{name}</h3>
        <p>{cuisines.join(",")}</p>
        <p>{avgRating} stars</p>
        <p>{costForTwo / 100} for two</p>
        <p>{deliveryTime} minutes</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
