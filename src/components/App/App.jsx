import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../services/slices/ingredients-slice/ingredients";
import { checkUserAuth } from "../services/slices/user-slice/auth";
import { ROUTE } from "../utils/constants";
import { MainLayout } from "../../layouts/MainLayout";
import IngredientDetails from "../IngredientDetails/ingredient-details";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/protected-route";
import {
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

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path={ROUTE.main} element={<MainLayout />}>
          <Route index element={<AppConstructor />} />
          <Route
            path={ROUTE.mainLayout.currIngredient}
            element={<IngredientDetails />}
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
            path={ROUTE.mainLayout.currIngredient}
            element={
              <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
