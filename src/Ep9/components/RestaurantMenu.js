import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />;

  const info = resInfo?.cards?.[2]?.card?.card?.info;

  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating } =
    info;

  const regularCards = resInfo?.cards?.find(
    (card) => card?.groupedCard?.cardGroupMap?.REGULAR,
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const itemCards =
    regularCards?.find((card) => card?.card?.card?.itemCards)?.card?.card
      ?.itemCards || [];

  return (
    <div className="menu-container">
      <div className="restaurant-card">
        <img
          className="restaurant-banner"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
        />

        <div className="restaurant-info">
          <h1>{name}</h1>

          <div className="rating-box">
            ⭐ {avgRating} • {costForTwoMessage}
          </div>

          <p>{cuisines?.join(", ")}</p>
        </div>
      </div>

      <h2 className="menu-title">Recommended</h2>

      <div className="menu-list">
        {itemCards.map((item) => (
          <div className="menu-item" key={item.card.info.id}>
            <div className="menu-left">
              <h3>{item.card.info.name}</h3>

              <h4>
                ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
              </h4>

              {item.card.info.description && (
                <p>{item.card.info.description}</p>
              )}
            </div>

            {item.card.info.imageId && (
              <img
                className="food-image"
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
