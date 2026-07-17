import restrautList from "../utils/mock_data.js";
import RestaurantCard from "./RestaurantCard.js";
import { useState, useEffect } from "react";

import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestraunt, setlistOfRestraunt] = useState([]);

  const [filteredRestraunt, setfilteredRestraunt] = useState([]);

  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4398772&lng=78.36573419999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );

    const json = await data.json();

    setlistOfRestraunt(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setfilteredRestraunt(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
  };

  if (listOfRestraunt.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="search">
        <input
          type="text"
          className="search-box"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const filteredRestraunt = listOfRestraunt.filter((res) => {
              return res.info.name
                .toLowerCase()
                .includes(searchText.toLowerCase());
            });
            setfilteredRestraunt(filteredRestraunt);
          }}
        >
          Search
        </button>
      </div>
      <button
        className="filter-btn"
        onClick={() => {
          const filteredList = listOfRestraunt.filter(
            (res) => res.info.avgRating > 4,
          );
          setlistOfRestraunt(filteredList);
        }}
      >
        Top Rated
      </button>
      <div className="res-container">
        {filteredRestraunt.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
