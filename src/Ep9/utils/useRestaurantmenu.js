import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId) return;

    fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      const response = await fetch(MENU_URL + resId);

      console.log("Status:", response.status);

      const text = await response.text();
      console.log("Response:", text);

      const json = JSON.parse(text);
      console.log(json);

      setResInfo(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
