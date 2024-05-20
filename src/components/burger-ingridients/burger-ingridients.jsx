import data from "../../sample-data/sample-data.json";
import React from "react";
import IngridientGroup from "./ingridient-group/ingridient-group";

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");
  const filteredBuns = data.filter((item) => item.type === "bun");
  const filteredSauces = data.filter((item) => item.type === "sauce");
  const filteredMains = data.filter((item) => item.type === "main");
  return (
    <>
      <IngridientGroup title={"Булки"} ingridients={filteredBuns} />
      <IngridientGroup title={"Соусы"} ingridients={filteredSauces} />
      <IngridientGroup title={"Начинки"} ingridients={filteredMains} />
    </>
  );
}
