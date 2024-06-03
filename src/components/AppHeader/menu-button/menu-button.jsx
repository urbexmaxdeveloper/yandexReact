import menuStyles from "./menu-button.module.css";
import PropTypes from "prop-types";

export default function MenuButton({ icon, label }) {
  return (
    <div className={menuStyles.menuButton}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

MenuButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};
