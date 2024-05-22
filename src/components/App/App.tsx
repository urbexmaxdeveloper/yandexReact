import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../AppHeader/header";
import mainPageStyles from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/burger-ingredients";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructor from "../BurgerConstructor/burger-contructor";
const apiUrl = "https://norma.nomoreparties.space/api/ingredients";
export default function App() {
  const [current, setCurrent] = React.useState("bun");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
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
          <div className={mainPageStyles.container_ingridients}>
            {data && <BurgerIngredients data={data} />}
          </div>
          <div className={mainPageStyles.container_constructor}>
            {data && <BurgerConstructor data={data} />}
          </div>
        </div>
      </main>
    </div>
  );
}
