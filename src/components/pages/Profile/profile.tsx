import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ProfileTabs } from "../../Profile/ProfileTabs/profile-tabs";
import styles from "./profile.module.css";

export const Profile: FC = () => {
  return (
    <div className={`${styles.profile} pl-4`}>
      <ProfileTabs />
      <Outlet />
    </div>
  );
};

export default Profile;
