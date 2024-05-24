import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../AppHeader/header";
import mainPageStyles from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/burger-ingredients";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructor from "../BurgerConstructor/burger-contructor";
import { getIngredients } from "../utils/burger-api";

export default function App() {
  const [current, setCurrent] = React.useState("bun");
  const [data, setData] = useState(null);
  const [isFetching, setFetchData] = useState(true);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        if (res.success) {
          setData(res.data);
          setFetchData(false);
        } else {
          setData(null);
        }
      })
      .catch(() => {
        throw new Error("Failed get ingridients");
      });
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
          {!isFetching ? (
            <>
              <div className={mainPageStyles.container_ingridients}>
                {data && <BurgerIngredients data={data} />}
              </div>
              <div className={mainPageStyles.container_constructor}>
                {data && <BurgerConstructor data={data} />}
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
