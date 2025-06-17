import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import UserNav from "../components/user-nav/UserNav";
import Summary from "../components/summary/Summary";
import FoodNotRecommended from "../components/foodNotRecommended/FoodNotRecommended";
import { useSelector } from "react-redux";
import styles from "./AppLayout.module.css";
import leaves from "../assets/leaves.png";
import leaves2x from "../assets/leaves2x.png";
import ImagesContainer from "../components/hero/ImagesContainer";
import { useLocation } from "react-router-dom";

const AppLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const showImagesContainer =
    !user && ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Header />
        <main className={styles.content}>
          <Outlet />
        {showImagesContainer && (
          <ImagesContainer
            variant={location.pathname === "/" ? "home" : "login"}
          />
        )}
        </main>
      </div>

      {user && <UserNav />}
      {user && (
        <div className={styles.right}>
          <Summary />
          <FoodNotRecommended />
          <picture>
            <source srcSet={`${leaves} 1x, ${leaves2x} 2x`} />
            <img src={leaves} alt="leaves" className={styles.leaves} />
          </picture>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
