import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import styles from "./UserNav.module.css";

const UserNav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <div className={styles.userNav}>
      <span className={styles.userName}>{user.name}</span>
   <div className= {styles.divider}></div>
      <button className={styles.logoutBtn} onClick={() => dispatch(logout())}>Exit</button>
    </div>
  );
};

export default UserNav;
