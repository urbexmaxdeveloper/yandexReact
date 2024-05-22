import IngredientGroup from "./ingredient-group/ingredient-group";
import PropTypes from "prop-types";

export default function BurgerIngredients({ data }) {
  const filteredBuns = data.data.filter((item) => item.type === "bun");
  const filteredSauces = data.data.filter((item) => item.type === "sauce");
  const filteredMains = data.data.filter((item) => item.type === "main");

  return (
    <>
      <IngredientGroup title={"Булки"} ingridients={filteredBuns} />
      <IngredientGroup title={"Соусы"} ingridients={filteredSauces} />
      <IngredientGroup title={"Начинки"} ingridients={filteredMains} />
    </>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ),
  }),
};
