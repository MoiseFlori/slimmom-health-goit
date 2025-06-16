import styles from "./LoginForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authThunk";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => navigate("/"))
      .catch(alert);
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className={styles.loginWrapper}>
      <h2 className={styles.title}>LOG IN</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          autoComplete="current-password"
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.primaryBtn}>
            Log in
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleGoToRegister}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
