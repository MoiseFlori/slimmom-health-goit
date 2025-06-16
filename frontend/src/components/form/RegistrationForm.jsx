import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import {registerUser }from "../../redux/authThunk";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        alert("Verifică-ți emailul pentru confirmare!");
        navigate("/login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.registerWrapper}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password *"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.primaryBtn}>
            Register
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleGoToLogin}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
