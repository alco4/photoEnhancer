import { useContext } from "react";
import { DarkModeContext } from '../../context/DarkModeProvider'
import moonIcon from "../../assets/img/moon.svg";
import sunIcon from "../../assets/img/sun.png";
import styles from "./appHeader.module.scss";

const AppHeader = ({ handleToggleDarkMode }: { handleToggleDarkMode: () => void }) => {
  const { isDarkMode } = useContext(DarkModeContext)
  return (
    <div
      className={`${styles.appHeader} ${isDarkMode && styles.darkModeTheme
        }`}
    >
      <h1 className={styles.appPageTitle}>Improve the style of your photos!</h1>
      <div className={styles.darkMode} onClick={handleToggleDarkMode}>
        {isDarkMode ? (
          <>
            <img className={styles.darkModeIcon} src={sunIcon} alt="sunIcon" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <img
              className={styles.darkModeIcon}
              src={moonIcon}
              alt="moonIcon"
            />
            <span>Dark Mode</span>
          </>
        )}
      </div>
    </div>
  );
};
export default AppHeader;
