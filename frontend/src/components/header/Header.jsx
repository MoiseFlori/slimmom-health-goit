import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import theme from "../../styles/theme.js";
import logoMobile from "../../assets/logo-mobile.png";
import logoMobile2x from "../../assets/logo-mobile@2x.png";
import logoTablet from "../../assets/logo-tablet.png";
import logoTablet2x from "../../assets/logo-tablet@2x.png";
import logoDesktop from "../../assets/logo-desktop.png";
import logoDesktop2x from "../../assets/logo-desktop@2x.png";
import UserMenu from "../menu/UserMenu.jsx";
import { ReactComponent as BurgerMenu } from "../../assets/burger-menu.svg";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";


const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <Link to="/">
            <picture>
              <source
                srcSet={`${logoDesktop} 1x, ${logoDesktop2x} 2x`}
                media={`(min-width: ${theme.breakpoints.desktop})`}
              />
              <source
                srcSet={`${logoTablet} 1x, ${logoTablet2x} 2x`}
                media={`(min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px)`}
              />
              <source
                srcSet={`${logoMobile} 1x, ${logoMobile2x} 2x`}
                media="(max-width: 767px)"
              />
              <img src={logoMobile} alt="logo" />
            </picture>
          </Link>
        </div>
        <div className={styles.divider}></div>

        {!user ? (
          <div className={styles.headerLinks}>
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
            <Link to="/register" className={styles.registerLink}>
              Registration
            </Link>
          </div>
        ) : (
          <div className={styles.loggedInContainer}>
            {isDesktop ? (
              <UserMenu />
            ) : (
              <>
                <button
                  className={styles.burgerBtn}
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <CloseIcon /> : <BurgerMenu />}
                </button>
                {menuOpen && <UserMenu onClose={() => setMenuOpen(false)} />}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
