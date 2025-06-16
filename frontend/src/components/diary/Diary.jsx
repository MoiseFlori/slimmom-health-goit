import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../utils/axiosConfig";
import styles from "./Diary.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as DeleteProduct } from "../../assets/deleteProduct.svg";
import { useDispatch } from "react-redux";
import { setConsumed, setDate } from "../../redux/dailyCalories/caloriesSlice";
import { useMediaQuery } from "react-responsive";
import ProductForm from "./ProductForm";

const Diary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrAbove = useMediaQuery({ minWidth: 768 });

  const initialDate = location.state?.selectedDate
    ? new Date(location.state.selectedDate)
    : new Date();

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [meals, setMeals] = useState([]);

  const formattedDate = selectedDate
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join(".");

  const apiDate = selectedDate.toISOString().split("T")[0];

  useEffect(() => {
    dispatch(setDate(apiDate));
  }, [selectedDate, dispatch]);


  const fetchDiary = async () => {
    try {
      const res = await axios.get(`/api/diary?date=${apiDate}`);
      const meals = res.data.meals || [];
      const totalCalories = res.data.totalCalories || 0;

      setMeals(meals);
      dispatch(setConsumed(totalCalories));
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  useEffect(() => {
    fetchDiary();
  }, [apiDate, dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/diary/product/${id}`);
      const meals = res.data.meals || [];
      const totalCalories = res.data.totalCalories || 0;

      setMeals(meals);
      dispatch(setConsumed(totalCalories));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.dateLabel}>{formattedDate}</span>

        <button
          type="button"
          className={styles.iconButton}
          onClick={() => calendarRef.current.setFocus()}
        >
          <CalendarIcon className={styles.icon} />
        </button>

        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          ref={calendarRef}
          className={styles.datePickerHidden}
          calendarClassName={styles.calendarPopup}
        />
      </div>

     
      {isTabletOrAbove && (
        <ProductForm inlineDate={apiDate} onProductAdded={fetchDiary} />
      )}

      <div className={styles.mealList}>
        {meals.map((entry) => (
          <div key={entry._id} className={styles.mealItem}>
            <span className={styles.mealTitle}>{entry.product.title}</span>
            <span className={styles.mealInfo}>{entry.grams} g</span>
            <span className={styles.mealInfo}>
              {entry.calories} <span className={styles.kcal}>kcal</span>
            </span>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(entry._id)}
            >
              <DeleteProduct />
            </button>
          </div>
        ))}
      </div>

      {isMobile && (
        <button
          onClick={() =>
            navigate("/diary/add", { state: { selectedDate: apiDate } })
          }
          className={styles.addButton}
        >
          +
        </button>
      )}
    </div>
  );
};

export default Diary;
