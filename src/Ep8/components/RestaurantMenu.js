import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL, MENU_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_URL);
      console.log("status:", data.status);

      const text = await data.text();
      console.log("raw text:", text);

      if (!text) {
        console.error("Empty response body");
        return;
      }

      const json = JSON.parse(text);
      setResInfo(json.data);
    } catch (err) {
      console.error("Fetch failed:", err.message);
    }
  };

  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating } =
    resInfo.cards[2].card.card.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  return (
    <div className="menu">
      <h1>{name}</h1>

      <img
        className="menu-card"
        alt="Restaurant"
        src={CDN_URL + cloudinaryImageId}
      />

      <h2>
        {avgRating} • {costForTwoMessage}
      </h2>

      <h2>{cuisines.join(", ")}</h2>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>{item.card.info.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
