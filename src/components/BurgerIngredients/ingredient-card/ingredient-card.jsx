import { useState, useEffect, useCallback } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";

import styles from "./ingredient-card.module.css";
import ingredientsPropTypes from "../../utils/prop-types";

export default function IngredientCard({ ingredient }) {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { name, price, image } = ingredient;

  const selectedBun = useSelector(
    (store) => store.burgerConstructor.selectedBun
  );
  const selectedIngredients = useSelector(
    (store) => store.burgerConstructor.selectedIngredients
  );

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient, idx: uuidv4() },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const updateCount = useCallback(() => {
    if (selectedBun && ingredient.type === "bun") {
      setCount(selectedBun._id === ingredient._id ? 2 : 0);
    } else {
      setCount(
        selectedIngredients.filter((item) => item._id === ingredient._id).length
      );
    }
  }, [selectedBun, selectedIngredients, ingredient]);

  useEffect(() => {
    updateCount();
  }, [updateCount]);

  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div
        className={styles.root}
        ref={dragRef}
        onClick={() => setShowModal(true)}
      >
        <div className={`${styles.details} ${isDrag ? styles.dragging : ""}`}>
          <img src={image} alt={name} />
          <div className={styles.cost_block}>
            <Counter count={count} size="default" />
            <p className="text text_type_main-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default" align="center">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};
