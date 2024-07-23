import styles from "./profile-tabs.module.css";
import { ROUTE } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router";
import { userLogout } from "../../services/slices/user-slice/auth";
import { ProfileTab } from "./ProfileTab/profile-tab";
import { useDispatchHook } from "../../services/store/hooks";
import { FC } from "react";

export const ProfileTabs: FC = () => {
  const dispatch = useDispatchHook();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (): void => {
    dispatch(userLogout())
      .then(() => navigate(`/${ROUTE.mainLayout.login}`, { replace: true }))
      .catch((error) => console.error(error));
  };

  const profileTabs = [
    { id: 1, name: "Профиль", route: ROUTE.userProfile.profile },
    { id: 2, name: "История заказов", route: ROUTE.userProfile.orders },
  ];

  return (
    <div className={styles.tabsContainer}>
      <ul className={styles.profileTabs}>
        {profileTabs.map((tab) => (
          <ProfileTab
            key={tab.id}
            route={tab.route}
            className="pt-3 pb-3"
            text={tab.name}
          />
        ))}
        <li className="pt-3">
          <button onClick={handleLogout} type="button" className={styles.btn}>
            Выйти
          </button>
        </li>
      </ul>
      <p
        className={`${styles.caption} text text_type_main-default text_color_inactive`}
      >
        {location.pathname.endsWith(ROUTE.userProfile.profile)
          ? "В этом разделе вы можете изменить свои персональные данные"
          : "В этом разделе вы можете посмотреть свою историю заказов"}
      </p>
    </div>
  );
};
