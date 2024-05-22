import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-component.module.css";
import PropTypes from "prop-types";

export default function BurgerComponent({ component, type, isDrag }) {
  if (!component) {
    return null;
  }
  return (
    <div className={styles.box}>
      {isDrag ? <DragIcon type="primary" /> : null}
      <ConstructorElement
        type={type}
        text={component.name}
        price={component.price}
        thumbnail={component.image_mobile}
      />
    </div>
  );
}

BurgerComponent.propTypes = {
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
