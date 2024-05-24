import { ingredientDetails } from "../utils/prop-types";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

export default function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <ul
        className={`${
          styles.nutritions
        } ${"text text_type_main-default text_color_inactive"}`}
      >
        <li className={`${styles.nut_item} `}>
          <span>Калории,ккал</span>
          <span>{ingredient.calories}</span>
        </li>
        <li className={styles.nut_item}>
          <span>Белки, г</span>
          <span>{ingredient.proteins}</span>
        </li>
        <li className={styles.nut_item}>
          <span> Жиры, г</span>
          <span>{ingredient.fat}</span>
        </li>
        <li className={styles.nut_item}>
          <span> Углеводы, г</span>
          <span>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
}

ingredientDetails.propTypes = {
  ingredient: PropTypes.arrayOf(ingredientDetails),
};
