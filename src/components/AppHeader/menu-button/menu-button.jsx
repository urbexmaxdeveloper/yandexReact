import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./menu-button.module.css";

const HeaderButton = ({ link, icon: Icon, text }) => (
  <NavLink to={link} className={styles.menuButton}>
    {({ isActive }) => (
      <>
        <Icon type={isActive ? "primary" : "secondary"} />
        <span
          className={`text text_type_main-default ${
            isActive ? "text_color_primary" : "text_color_inactive"
          }`}
        >
          {text}
        </span>
      </>
    )}
  </NavLink>
);

HeaderButton.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};

export default HeaderButton;
