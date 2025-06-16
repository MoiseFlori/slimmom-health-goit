import styles from "./ProductForm.module.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConsumed } from "../../redux/dailyCalories/caloriesSlice";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";
import axios from "../../utils/axiosConfig";
import { useMediaQuery } from "react-responsive";

export default function ProductForm({ inlineDate, onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    grams: "",
    productId: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const skipNextFetch = useRef(false); // blocăm re-fetch după selectare

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const location = useLocation();
  const reduxDate = useSelector((state) => state.dailyCalories.selectedDate);
  const passedDate = inlineDate || location.state?.selectedDate || reduxDate;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") navigate(-1);
    },
    [navigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }

    const fetchSuggestions = async () => {
      if (formData.name.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `/api/products/search?query=${formData.name}`
        );
        setSuggestions(res.data);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Autocomplete error:", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [formData.name]);

  const handleSelectSuggestion = (product) => {
    skipNextFetch.current = true;
    setFormData((prev) => ({
      ...prev,
      name: product.title,
      productId: product._id,
    }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productId || !formData.grams) return;

    try {
      await axios.post("/api/diary/product", {
        date: passedDate,
        productId: formData.productId,
        grams: Number(formData.grams),
      });

      if (onProductAdded) onProductAdded();

      const res = await axios.get(`/api/diary?date=${passedDate}`);
      dispatch(setConsumed(res.data.totalCalories || 0));

      setFormData({ name: "", grams: "", productId: "" });
      navigate("/diary", { state: { selectedDate: passedDate } });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <ArrowRight className={styles.arrowRight} />
      </button>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onFocus={() => formData.name && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul className={styles.suggestionsList}>
              {suggestions.map((prod) => (
                <li
                  key={prod._id}
                  className={styles.suggestionItem}
                  onMouseDown={() => handleSelectSuggestion(prod)} // mouseDown evită onBlur
                >
                  {prod.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          className={`${styles.input} ${styles.grams}`}
          type="number"
          placeholder="Grams"
          value={formData.grams}
          onChange={(e) => setFormData({ ...formData, grams: e.target.value })}
        />

        {isMobile ? (
          <button className={styles.mobileButton} type="submit">
            Add
          </button>
        ) : (
          <button className={styles.plusButton} type="submit">
            +
          </button>
        )}
      </form>
    </>
  );
}
