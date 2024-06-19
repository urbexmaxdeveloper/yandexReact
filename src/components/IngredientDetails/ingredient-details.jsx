import { useParams } from "react-router-dom";
import ingredientsPropTypes from "../utils/prop-types";
import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { setDetailIngredient } from "../services/slices/modal-ingredients/modal-ingredients";
import IngredientDetail from "./IngredientDetail/ingredient-detail";

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const dispatch = useDispatch();

  const findIngredient = useCallback(() => {
    const currIngredient = ingredients?.find(
      (item) => item._id === ingredientId
    );

    if (currIngredient) {
      dispatch(setDetailIngredient(currIngredient));
    }
  }, [ingredients, dispatch, ingredientId]);

  useEffect(() => {
    findIngredient();
  }, [findIngredient]);

  const detailIngredient = useSelector(
    (store) => store.modalIngredient.detailIngredient
  );

  if (!detailIngredient) {
    return <p>Ингредиент не найден</p>;
  }

  const detailsList = [
    {
      id: 1,
      detailValue: detailIngredient?.calories,
      detailText: "Калории,ккал",
    },
    {
      id: 2,
      detailValue: detailIngredient?.proteins,
      detailText: "Белки, г",
    },
    {
      id: 3,
      detailValue: detailIngredient?.fat,
      detailText: "Жиры, г",
    },
    {
      id: 4,
      detailValue: detailIngredient?.carbohydrates,
      detailText: "Углеводы, г",
    },
  ];

  return (
    <div className={styles.details}>
      <img
        className={styles.image}
        src={detailIngredient?.image_large}
        alt={`Ингредиент: ${detailIngredient?.name}`}
      />
      <h4
        className={`${styles.ingredientName} text text_type_main-medium mt-4 mb-8`}
      >
        {detailIngredient?.name}
      </h4>
      <div className={styles.details}>
        <ul className={styles.detailsList}>
          {detailsList.map((detail) => (
            <li key={detail.id}>
              <IngredientDetail
                detailValue={detail.detailValue}
                detailText={detail.detailText}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
