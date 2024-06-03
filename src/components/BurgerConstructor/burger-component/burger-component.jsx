import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-component.module.css";
import PropTypes from "prop-types";
import { ingredientDetails } from "../../utils/prop-types";

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
  data: PropTypes.arrayOf(ingredientDetails),
};
