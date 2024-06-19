import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuButton from "./menu-button/menu-button";
import headerStyles from "./header.module.css";
import { ROUTE } from "../utils/constants";

export default function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.menuBlock}>
        <ul className={`${headerStyles.menu} text text_type_main-small`}>
          <li className={headerStyles.menuItem}>
            <MenuButton
              icon={BurgerIcon}
              text="Конструктор"
              link={ROUTE.main}
            />
          </li>
          <li className={headerStyles.menuItem}>
            <MenuButton
              icon={ListIcon}
              text="Лента заказов"
              link={ROUTE.mainLayout.feed}
            />
          </li>
          <li className={`${headerStyles.menuItem} pl-30`}>
            <Logo />
          </li>
          <li className={`${headerStyles.menuItem} pl-25`}>
            <MenuButton
              icon={ProfileIcon}
              text="Личный кабинет"
              link={ROUTE.userProfile.profile}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
