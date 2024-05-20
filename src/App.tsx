import React from "react";
import "./App.css";
import Header from "./components/header/header";
import mainPageStyles from "./App.module.css";
import BurgerIngredients from "./components/burger-ingridients/burger-ingridients";
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructor from "./components/burger-constructor/burger-contructor";

function App() {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div>
      <Header />
      <main className={`${mainPageStyles.main_page} `}>
      <div className={mainPageStyles.container_ingridients_header}>
              <p className="text text_type_main-medium">Соберите бургер</p>
              <div style={{ display: "flex" }}>
                <Tab
                  value="bun"
                  active={current === "bun"}
                  onClick={setCurrent}
                >
                  Булки
                </Tab>
                <Tab
                  value="sauce"
                  active={current === "sauce"}
                  onClick={setCurrent}
                >
                  Соусы
                </Tab>
                <Tab
                  value="main"
                  active={current === "main"}
                  onClick={setCurrent}
                >
                  Начинки
                </Tab>
              </div>
            </div>
        <div className={mainPageStyles.container}>
          <div className={mainPageStyles.container_ingridients}>
           
            <BurgerIngredients />
          </div>
          <div className={mainPageStyles.container_constructor}>
          <BurgerConstructor/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
