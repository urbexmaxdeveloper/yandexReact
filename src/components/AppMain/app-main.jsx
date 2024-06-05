import { useEffect } from "react";
import mainPageStyles from "./app-main.module.css";
import BurgerIngredients from "../BurgerIngredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../BurgerConstructor/burger-contructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/slices/ingredients-slice/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function AppMain() {
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
        <div className={mainPageStyles.container}>
          {!getIngredientsRequest ? (
            <DndProvider backend={HTML5Backend}>
              <div className={mainPageStyles.container_ingridients}>
                <BurgerIngredients />
              </div>
              <div className={mainPageStyles.container_constructor}>
                <BurgerConstructor />
              </div>
            </DndProvider>
          ) : (
            <p>Нет данных</p>
          )}
        </div>
      </main>
    </div>
  );
}
