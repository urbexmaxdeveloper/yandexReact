import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import MenuButton from "../menu-button/menu-button";
import headerStyles from "./header.module.css";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <nav className={headerStyles.menuBlock}>
          <ul className={headerStyles.menu}>
            <li className={headerStyles.menuItem}>
              <MenuButton
                icon={<BurgerIcon type="primary" />}
                label="Конструктор"
              />
            </li>
            <li className={headerStyles.menuItem}>
              <MenuButton
                icon={<ListIcon type="primary" />}
                label="Лента заказов"
              />
            </li>
            <li className={`${headerStyles.menuItem} pl-30`}>
              <Logo />
            </li>
            <li li className={`${headerStyles.menuItem} pl-25`}>
              <MenuButton
                icon={<ProfileIcon type="primary" />}
                label="Личный кабинет"
              />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
export default AppHeader;
