import { ingredientDetails } from "../utils/prop-types";
import IngredientGroup from "./ingredient-group/ingredient-group";
import PropTypes from "prop-types";
import { useMemo } from "react";

export default function BurgerIngredients({ data }) {
  const filteredBuns = useMemo(() => {
    return data.filter((item) => item.type === "bun");
  }, [data]);

  const filteredSauces = useMemo(() => {
    return data.filter((item) => item.type === "sauce");
  }, [data]);

  const filteredMains = useMemo(() => {
    return data.filter((item) => item.type === "main");
  }, [data]);

  return (
    <>
      <IngredientGroup title={"Булки"} ingridients={filteredBuns} />
      <IngredientGroup title={"Соусы"} ingridients={filteredSauces} />
      <IngredientGroup title={"Начинки"} ingridients={filteredMains} />
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientDetails),
};
