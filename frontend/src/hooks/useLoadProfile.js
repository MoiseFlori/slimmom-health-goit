import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDailyRate,
  setNotAllowedFoods,
} from "../redux/dailyCalories/caloriesSlice";
import axios from "axios";

const useLoadProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { dailyRate, blood } = res.data;

        if (dailyRate) dispatch(setDailyRate(dailyRate));

        if (blood) {
          const foodRes = await axios.get(
            `http://localhost:3000/api/products/not-recommended/${blood}`
          );
          dispatch(setNotAllowedFoods(foodRes.data));
        }
      } catch (error) {
        console.log("User not logged in or error fetching profile");
      }
    };

    fetchProfile();
  }, [token, dispatch]);
};

export default useLoadProfile;
