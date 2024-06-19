import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader/header";

export const MainLayout = () => {
  const isRequestLoading = useSelector((store) => store.user.isRequestLoading);
  return (
    <>
      <AppHeader />
      {isRequestLoading ? <p>Загрузка</p> : <Outlet />}
    </>
  );
};
