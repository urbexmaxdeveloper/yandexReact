import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../profile-tabs.module.css";

export const ProfileTab = ({ route, text, className }) => {
  const location = useLocation();

  return (
    <li className={className}>
      <NavLink to={route} className={styles.NavLink}>
        {({ isActive }) => (
          <span
            className={`${
              isActive &&
              location.pathname.split("/").pop() === route.split("/").pop()
                ? "text_color_primary"
                : "text_color_inactive"
            } text text_type_main-medium text-decoration: none;`}
          >
            {text}
          </span>
        )}
      </NavLink>
    </li>
  );
};

ProfileTab.propTypes = {
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
