import React, { useEffect, useCallback } from "react";
import styles from "./Modal.module.css";

import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";

const Modal = ({ calorieIntake, notRecommendedFoods, onClose }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);


  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal}>
        {/* Buton închis mobil */}
        <button className={styles.closeMobile} onClick={onClose}>
          <ArrowRight className={styles.arrowRight} />
        </button>

        {/* Buton închis desktop */}
        <button className={styles.closeDesktop} onClick={onClose}>
          <CloseIcon className={styles.closeIcon } />
        </button>

        <h2 className={styles.modalTitle}>
          Your recommended daily calorie intake is
        </h2>

        <div className={styles.calorieIntake}>{calorieIntake} kcal</div>

        <div className={styles.modalContent}>
          <h2 className={styles.subtitle}>Foods you should not eat</h2>
          <ol className={styles.listOfFood}>
            {notRecommendedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ol>
        </div>
        <button className={styles.buttonSubmit} type="submit">
          Start losing weight
        </button>
      </div>
    </div>
  );
};

export default Modal;
