import menuStyles from "./menu-button.module.css";

const MenuButton = ({ icon, label }) => {
  return (
    <div className={menuStyles.menuButton}>
      {icon}
      <span >{label}</span>
    </div>
  );
};

export default MenuButton;
