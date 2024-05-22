import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { useState } from "react";
import Modal from "../../Modal/modal";
import IngredientDetails from "../../IngredientDetails/ingredient-details";
import PropTypes from "prop-types";

export default function IngredientCard({ ingredient }) {
  const [showModal, setShowModal] = useState({
    ingredient: null,
    isOpen: false,
  });

  const showModalHandler = (ingredient) => {
    setShowModal({
      ingredient,
      isOpen: true,
    });
  };

  const onModalClosed = () => {
    setShowModal({
      ingredient: null,
      isOpen: false,
    });
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.details}
        key={ingredient._id}
        onClick={() => showModalHandler(ingredient)}
      >
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={styles.cost_block}>
          <p className="text text_type_main-default ">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div>
          <p align="center" className="text text_type_main-default">
            {ingredient.name}
          </p>
        </div>
      </div>
      <Modal
        title="Детали ингредиента"
        isOpen={showModal.isOpen}
        setIsModalOpen={onModalClosed}
        width={720}
        height={539}
      >
        <IngredientDetails ingredient={showModal.ingredient} />
      </Modal>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
