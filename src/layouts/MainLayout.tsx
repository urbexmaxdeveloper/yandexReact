import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader/header";
import { RootState } from "../components/services/store/store";

export const MainLayout: React.FC = () => {
  const isRequestLoading = useSelector(
    (store: RootState) => store.user.isRequestLoading
  );

  return (
    <>
      <AppHeader />
      {isRequestLoading ? <p>Загрузка</p> : <Outlet />}
    </>
  );
};
