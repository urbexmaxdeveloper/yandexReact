import React, { useEffect } from "react";
import mainPageStyles from "./app-main.module.css";
import BurgerIngredients from "../BurgerIngredients/burger-ingredients";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructor from "../BurgerConstructor/burger-contructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/slices/ingredients-slice/ingredients";

export default function AppMain() {
  const [current, setCurrent] = React.useState("bun");

  const dispatch = useDispatch();
  const getIngredientsRequest = useSelector(
    (store) => store.ingredients.getIngredientsRequest
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div>
      <main className={mainPageStyles.main_page}>
        <div className={mainPageStyles.container_ingridients_header}>
          <p className="text text_type_main-medium">Соберите бургер</p>
          <div style={{ display: "flex" }}>
            <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab
              value="sauce"
              active={current === "sauce"}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
            <Tab value="main" active={current === "main"} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
        </div>
        <div className={mainPageStyles.container}>
          {!getIngredientsRequest ? (
            <>
              <div className={mainPageStyles.container_ingridients}>
                <BurgerIngredients />
              </div>
              <div className={mainPageStyles.container_constructor}>
                <BurgerConstructor />
              </div>
            </>
          ) : (
            <p>Нет данных</p>
          )}
        </div>
      </main>
    </div>
  );
}
