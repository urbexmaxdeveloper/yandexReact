import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { setDetailIngredient } from "../services/slices/modal-ingredients/modal-ingredients";
import IngredientDetail from "./IngredientDetail/ingredient-detail";
import { IIngredientDetails } from "../types/ingredient-types";
import { useDispatchHook, useSelectorHook } from "../services/store/hooks";

const IngredientDetails: React.FC = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const ingredients = useSelectorHook((store) => store.ingredients.ingredients);
  const dispatch = useDispatchHook();

  useEffect(() => {
    const currIngredient = ingredients?.find(
      (item) => item._id === ingredientId
    );

    if (currIngredient) {
      dispatch(setDetailIngredient(currIngredient));
    }
  }, [dispatch, ingredients, ingredientId]);

  const detailIngredient = useSelectorHook(
    (store) => store.modalIngredient.detailIngredient
  );

  const detailsList: IIngredientDetails[] = [
    {
      id: 1,
      detailValue: detailIngredient?.calories,
      detailText: "Калории, ккал",
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

  if (!detailIngredient) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <div className={styles.details}>
      <img
        className={styles.image}
        src={detailIngredient.image_large}
        alt={`Ингредиент: ${detailIngredient.name}`}
      />
      <h4
        className={`${styles.ingredientName} text text_type_main-medium mt-4 mb-8`}
      >
        {detailIngredient.name}
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
