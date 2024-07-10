import { NavLink } from "react-router-dom";
import styles from "./menu-button.module.css";
import { ElementType, FC } from "react";

interface HeaderButtonProps {
  link: string;
  icon: ElementType;
  text: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({ link, icon: Icon, text }) => (
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

export default HeaderButton;
