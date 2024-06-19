import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import mainPageStyles from "./app-main.module.css";
import BurgerIngredients from "../BurgerIngredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../BurgerConstructor/burger-contructor";

const AppMain = () => {
  const getIngredientsRequest = useSelector(
    (store) => store.ingredients.getIngredientsRequest
  );

  return (
    <main className={mainPageStyles.main_page}>
      <div className={mainPageStyles.container}>
        {getIngredientsRequest ? (
          <p>Нет данных</p>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <div className={mainPageStyles.container_ingridients}>
              <BurgerIngredients />
            </div>
            <div className={mainPageStyles.container_constructor}>
              <BurgerConstructor />
            </div>
          </DndProvider>
        )}
      </div>
    </main>
  );
};

export default AppMain;
