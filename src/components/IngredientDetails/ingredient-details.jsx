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

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
  }),
};
