import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getIngredients } from "../services/slices/ingredients-slice/ingredients";
import { checkUserAuth } from "../services/slices/user-slice/auth";
import { ROUTE } from "../utils/constants";
import IngredientDetails from "../IngredientDetails/ingredient-details";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/protected-route";
import {
  Feed,
  ForgotPassword,
  Login,
  NotFound,
  Profile,
  Register,
  ResetPassword,
} from "../pages";
import { ProfileInfo } from "../Profile/ProfileInfo/profile-info";
import { ProfileOrders } from "../Profile/ProfileOrders/profile-orders";
import Modal from "../Modal/modal";
import AppConstructor from "../AppMain/app-main";
import { useDispatchHook } from "../services/store/hooks";
import { OrderInfo } from "../OrderInfo/order-info";
import MainLayout from "../../layouts/MainLayout";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatchHook();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getIngredients());
      await dispatch(checkUserAuth());
    };

    fetchData();
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <Routes location={background || location}>
        <Route path={ROUTE.main} element={<MainLayout />}>
          <Route index element={<AppConstructor />} />
          <Route
            path={ROUTE.mainLayout.currIngredient}
            element={<IngredientDetails />}
          />
          <Route path={ROUTE.mainLayout.feed} element={<Feed />} />
          <Route path={ROUTE.mainLayout.feedOrder} element={<OrderInfo />} />
          <Route
            path={ROUTE.userProfile.userOrders}
            element={<OnlyAuth component={<OrderInfo />} />}
          />
          <Route
            path={ROUTE.mainLayout.login}
            element={<OnlyUnAuth component={<Login />} />}
          />
          <Route
            path={ROUTE.mainLayout.register}
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path={ROUTE.mainLayout.forgotPass}
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path={ROUTE.mainLayout.resetPass}
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route
            path={ROUTE.userProfile.profile}
            element={<OnlyAuth component={<Profile />} />}
          >
            <Route index element={<OnlyAuth component={<ProfileInfo />} />} />
            <Route
              path={ROUTE.userProfile.orders}
              element={<OnlyAuth component={<ProfileOrders />} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={`/${ROUTE.mainLayout.currIngredient}`}
            element={
              <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={`/${ROUTE.mainLayout.feedOrder}`}
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={`/${ROUTE.userProfile.userOrders}`}
            element={
              <Modal onClose={handleCloseModal}>
                <OnlyAuth component={<OrderInfo />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </React.Fragment>
  );
}

export default App;
