import { ProfileTabs } from "../../Profile/ProfileTabs/profile-tabs";
import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";

export const Profile = () => {
  return (
    <div className={`${styles.profile}`}>
      <ProfileTabs />
      <Outlet />
    </div>
  );
};
