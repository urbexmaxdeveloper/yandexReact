import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuButton from "./menu-button/menu-button";
import headerStyles from "./header.module.css";

export default function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.menuBlock}>
        <ul className={`${headerStyles.menu} text text_type_main-small`}>
          <li className={headerStyles.menuItem}>
            <a href="#">
              <MenuButton
                icon={<BurgerIcon type="primary" />}
                label="Конструктор"
              />
            </a>
          </li>
          <li className={headerStyles.menuItem}>
            <a href="#">
              <MenuButton
                icon={<ListIcon type="primary" />}
                label="Лента заказов"
              />
            </a>
          </li>
          <li className={`${headerStyles.menuItem} pl-30`}>
            <Logo />
          </li>
          <li className={`${headerStyles.menuItem} pl-25`}>
            <a href="#">
              <MenuButton
                icon={<ProfileIcon type="primary" />}
                label="Личный кабинет"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
