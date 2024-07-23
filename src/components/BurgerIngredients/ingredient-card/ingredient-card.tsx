import { FC, memo, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { IIngredient } from "../../types/ingredient-types";

import styles from "./ingredient-card.module.css";
import { useSelectorHook } from "../../services/store/hooks";

type IngredientCardProps = {
  ingredient: IIngredient;
};

const IngredientCard: FC<IngredientCardProps> = memo(({ ingredient }) => {
  const [count, setCount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const location = useLocation();
  const { name, price, image } = ingredient;

  const selectedBun = useSelectorHook(
    (state) => state.burgerConstructor.selectedBun
  );
  const selectedIngredients = useSelectorHook(
    (state) => state.burgerConstructor.selectedIngredients
  );

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient, idx: uuidv4() },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (selectedBun && ingredient.type === "bun") {
      setCount(selectedBun._id === ingredient._id ? 2 : 0);
    } else {
      setCount(
        selectedIngredients.filter((item) => item._id === ingredient._id).length
      );
    }
  }, [selectedBun, selectedIngredients, ingredient]);

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
          <p
            className="text text_type_main-default"
            style={{ textAlign: "center" }}
          >
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
});

export default IngredientCard;
