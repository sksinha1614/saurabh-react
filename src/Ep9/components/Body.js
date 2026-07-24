import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard.js";
import Shimmer from "./Shimmer.js";

import { Link } from "react-router-dom";

import useOnlineStatus from "../utils/useOnlineStatus.js";

const Body = () => {
  const [listOfRestraunt, setlistOfRestraunt] = useState([]);
  const [filteredRestraunt, setfilteredRestraunt] = useState([]);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9121181&lng=77.6445548&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );

    const json = await data.json();
    const restaurants =
      json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setlistOfRestraunt(restaurants);
    setfilteredRestraunt(restaurants);
  };

  const handleSearch = () => {
    const filteredList = listOfRestraunt.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    setfilteredRestraunt(filteredList);
  };

  const handleTopRated = () => {
    const filteredList = listOfRestraunt.filter(
      (res) => Number(res.info.avgRating) > 4,
    );

    setfilteredRestraunt(filteredList);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus == false) {
    return <h1>Oops please check your internet connection</h1>;
  }

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
          onChange={(e) => setsearchText(e.target.value)}
        />

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>

        <button className="filter-btn" onClick={handleTopRated}>
          Top Rated
        </button>
      </div>

      <div className="res-container">
        {filteredRestraunt.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurant/" + restaurant?.info?.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
