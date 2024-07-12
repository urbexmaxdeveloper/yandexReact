import styles from "./profile-tabs.module.css";
import { ROUTE } from "../../utils/constants";
import { useNavigate } from "react-router";
import { userLogout } from "../../services/slices/user-slice/auth";
import { ProfileTab } from "./ProfileTab/profile-tab";
import { useDispatchHook } from "../../services/store/hooks";

export const ProfileTabs = () => {
  const dispatch = useDispatchHook();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    dispatch(userLogout())
      .then(() => navigate(`/${ROUTE.mainLayout.login}`, { replace: true }))
      .catch((error) => console.error(error));
  };

  const profileTabs = [
    { name: "Профиль", route: ROUTE.userProfile.profile },
    { name: "История заказов", route: ROUTE.userProfile.orders },
  ];

  return (
    <div className={styles.tabsContainer}>
      <ul className={styles.profileTabs}>
        {profileTabs.map((tab) => (
          <ProfileTab
            key={tab.route}
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
      <div className={styles.caption}>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </div>
    </div>
  );
};
