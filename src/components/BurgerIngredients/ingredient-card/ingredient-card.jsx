import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { useState, useEffect } from "react";
import Modal from "../../Modal/modal";
import IngredientDetails from "../../IngredientDetails/ingredient-details";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import ingredientsPropTypes from "../../utils/prop-types";

export default function IngredientCard({ ingredient }) {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (selectedBun && ingredient.type === "bun") {
      setCount(selectedBun._id === ingredient._id ? 2 : 0);
    } else {
      setCount(
        selectedIngredients.filter((item) => item._id === ingredient._id).length
      );
    }
  }, [selectedBun, selectedIngredients, ingredient]);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.root}>
      <div
        className={`${styles.details} ${isDrag ? styles.dragging : ""}`}
        ref={dragRef}
        onClick={openModalHandler}
      >
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
      {showModal && (
        <Modal
          title="Детали ингредиента"
          isOpen={showModal}
          setIsModalOpen={closeModalHandler}
          width={720}
          height={539}
        >
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};
