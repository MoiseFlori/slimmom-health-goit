import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import styles from "./DailyCaloriesForm.module.css";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../redux/dailyCalories/caloriesSlice";
import { useEffect } from "react";

import {
  setDailyRate,
  setNotAllowedFoods,
} from "../../redux/dailyCalories/caloriesSlice";

import axios from "../../utils/axiosConfig";

const schema = yup.object().shape({
  height: yup
    .number()
    .typeError("Please enter a valid height (number)")
    .required("Height is required"),
  age: yup
    .number()
    .typeError("Please enter a valid age (number)")
    .required("Age is required"),
  currentWeight: yup
    .number()
    .typeError("Please enter your current weight (number)")
    .required("Current weight is required"),
  desiredWeight: yup
    .number()
    .typeError("Please enter your desired weight (number)")
    .required("Desired weight is required"),
  blood: yup.string().required("Please select a blood type"),
});

const initialValues = {
  height: "",
  age: "",
  currentWeight: "",
  desiredWeight: "",
  blood: "",
};

const DailyCaloriesForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notRecommendedFoods, setNotRecommendedFoods] = useState([]);
  const [calories, setCalories] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.dailyCalories.selectedDate);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    dispatch(setDate(today));
  }, [dispatch]);

  const handleSubmit = async (values, { resetForm }) => {
    const { height, age, currentWeight, desiredWeight, blood } = values;
    const parsedHeight = Number(height);
    const parsedAge = Number(age);
    const parsedWeight = Number(currentWeight);

    const bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;
    const caloriesForWeightLoss = Math.round(bmr - 400);

    setCalories(caloriesForWeightLoss);
    dispatch(setDailyRate(caloriesForWeightLoss));

    try {
      // update user profile in DB
      await axios.patch(
        "http://localhost:3000/users/profile",
        {
          height: parsedHeight,
          age: parsedAge,
          currentWeight: parsedWeight,
          desiredWeight: Number(desiredWeight),
          blood: Number(blood),
          dailyRate: caloriesForWeightLoss,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await axios.get(
        `http://localhost:3000/api/products/not-recommended/${blood}`
      );
      setNotRecommendedFoods(res.data);
      dispatch(setNotAllowedFoods(res.data));
    } catch (error) {
      console.error("Failed to save profile or fetch foods", error);
    }

    setIsModalOpen(true);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.formWrapper}>
          <label className={styles.labelInput} htmlFor="height">
            <ErrorMessage
              className={styles.formError}
              name="height"
              component="div"
            />
            <Field
              className={styles.input}
              type="text"
              name="height"
              placeholder="Height *"
            />
          </label>

          <label className={styles.labelInput} htmlFor="age">
            <ErrorMessage
              className={styles.formError}
              name="age"
              component="div"
            />
            <Field
              className={styles.input}
              type="text"
              name="age"
              placeholder="Age *"
            />
          </label>

          <label className={styles.labelInput} htmlFor="currentWeight">
            <ErrorMessage
              className={styles.formError}
              name="currentWeight"
              component="div"
            />
            <Field
              className={styles.input}
              type="text"
              name="currentWeight"
              placeholder="Current weight *"
            />
          </label>

          <label className={styles.labelInput} htmlFor="desiredWeight">
            <ErrorMessage
              className={styles.formError}
              name="desiredWeight"
              component="div"
            />
            <Field
              className={styles.input}
              type="text"
              name="desiredWeight"
              placeholder="Desired weight *"
            />
          </label>

          <div
            role="group"
            aria-labelledby="bloodType"
            className={styles.radioGroup}
          >
            <p className={styles.titleRadio} id="bloodType">
              Blood type *
            </p>
            <div className={styles.wrapperRadio}>
              {[1, 2, 3, 4].map((type) => (
                <React.Fragment key={type}>
                  <Field
                    className={styles.inputRadio}
                    type="radio"
                    name="blood"
                    id={`blood-${type}`}
                    value={String(type)}
                  />
                  <label
                    htmlFor={`blood-${type}`}
                    className={styles.labelRadio}
                  >
                    {type}
                  </label>
                </React.Fragment>
              ))}
            </div>
            <ErrorMessage
              className={styles.formError}
              name="blood"
              component="div"
            />
          </div>

          <button className={styles.buttonSubmit} type="submit">
            Start losing weight
          </button>
        </Form>
      </Formik>

      {isModalOpen && (
        <Modal
          calorieIntake={calories}
          notRecommendedFoods={notRecommendedFoods}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default DailyCaloriesForm;
