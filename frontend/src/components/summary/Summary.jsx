import React from "react";
import { useSelector } from "react-redux";
import styles from "./Summary.module.css";

const Summary = () => {
  const dailyRate = useSelector((state) => state.dailyCalories.dailyRate);
  const consumed = useSelector((state) => state.dailyCalories.consumed);

  const left = Math.max(dailyRate - consumed, 0);
  const percent = dailyRate ? Math.round((consumed / dailyRate) * 100) : 0;
  const selectedDate = useSelector((state) => state.dailyCalories.selectedDate);
  const formattedDate = selectedDate
    ? new Date(selectedDate)
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join(".")
    : "-";

  return (
    <div className={styles.summary}>
      <h3 className={styles.title}>Summary for {formattedDate}</h3>
      <ul className={styles.list}>
        <li>
          <span>Left</span>
          <span>{left} kcal</span>
        </li>
        <li>
          <span>Consumed</span>
          <span>{consumed} kcal</span>
        </li>
        <li>
          <span>Daily rate</span>
          <span>{dailyRate} kcal</span>
        </li>
        <li>
          <span>n% of normal</span>
          <span>{percent}%</span>
        </li>
      </ul>
    </div>
  );
};

export default Summary;
