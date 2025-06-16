import { NavLink } from "react-router-dom";
import styles from "./UserMenu.module.css";



const UserMenu = ({ onClose }) => {
  return (
    <div className={styles.menu}>
      <NavLink
        to="/diary"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
        onClick={onClose}
      >
        DIARY
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
        onClick={onClose}
      >
        CALCULATOR
      </NavLink>
    </div>
  );
};

export default UserMenu;
