import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/header";
import { useSelectorHook } from "../components/services/store/hooks";

const MainLayout: React.FC = () => {
  const isRequestLoading = useSelectorHook(
    (store) => store.user.isRequestLoading
  );
  const getIngredientsRequest = useSelectorHook(
    (store) => store.ingredients.getIngredientsRequest
  );

  return (
    <>
      <AppHeader />
      {isRequestLoading || getIngredientsRequest ? <p>Загрузка</p> : <Outlet />}
    </>
  );
};

export default MainLayout;
