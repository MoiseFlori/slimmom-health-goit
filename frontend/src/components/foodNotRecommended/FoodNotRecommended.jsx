import React from "react";
import { useSelector } from "react-redux";
import styles from "./FoodNotRecommended.module.css";

const FoodNotRecommended = () => {
  const foods = useSelector((state) => state.dailyCalories.notAllowedFoods);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Food not recommended</h3>
      {foods.length === 0 ? (
        <p className={styles.empty}>Your diet will be displayed here</p>
      ) : (
        <ul className={styles.list}>
          {foods.map((item, idx) => (
            <li key={idx} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodNotRecommended;
