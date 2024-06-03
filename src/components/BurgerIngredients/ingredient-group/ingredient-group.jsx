import { cardDescription } from "../../utils/prop-types";
import IngredientCard from "../ingredient-card/ingredient-card";
import ingridientsStyle from "./ingredient-group.module.css";
import PropTypes from "prop-types";

export default function IngredientGroup({ title, ingridients }) {
  return (
    <>
      <h1>{title}</h1>
      <div className={ingridientsStyle.items}>
        {ingridients.length > 0 &&
          ingridients.map((ingredient) => (
            <IngredientCard ingredient={ingredient} key={ingredient._id} />
          ))}
      </div>
    </>
  );
}

IngredientGroup.propTypes = {
  title: PropTypes.string.isRequired,
  ingridients: PropTypes.arrayOf(cardDescription).isRequired,
};
