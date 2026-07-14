import restrautList from "../utils/mock_data.js";
import RestaurantCard from "./RestaurantCard.js";
import { useState } from "react";

const Body = () => {
  const [listOfRestraunt, setlistOfRestraunt] = useState(restrautList);
  return (
    <div className="body">
      <div className="search">Search</div>
      <button
        className="filter-btn"
        onClick={() => {
          const filteredList = listOfRestraunt.filter(
            (res) => res.data.avgRating > 4,
          );
          setlistOfRestraunt(filteredList);
        }}
      >
        Top Rated
      </button>
      <div className="res-container">
        {restrautList.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.data.id} resData={restaurant} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
