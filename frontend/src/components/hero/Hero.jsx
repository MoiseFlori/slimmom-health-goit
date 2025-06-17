import React from "react";
import styles from "./Hero.module.css";
import DailyCalorieForm from "../form/DailyCaloriesForm.jsx";
import ImagesContainer from "./ImagesContainer.jsx";

const Hero = () => {
  return (
    <section className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>
        Calculate your daily calorie intake right now
      </h2>
      <div className={styles.heroContent}>
        <DailyCalorieForm />
      </div>
    </section>
  );
};

export default Hero;
