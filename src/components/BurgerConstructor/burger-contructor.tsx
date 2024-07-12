import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-contructor.module.css";
import Cost from "./cost/cost";
import Modal from "../Modal/modal";
import OrderDetails from "../OrderDetails/order-details";
import {
  calcTotalPrice,
  resetConstructor,
  setBun,
  addIngredient,
} from "../services/slices/burger-constructor/burger-constructor";
import { handleAndPlaceOrder } from "../services/slices/order-post-slice/order-post";
import { ROUTE } from "../utils/constants";
import { SelectedIngredient } from "./selected-ingredient/selected-ingredient";
import { SelectedBun } from "./selected-bun/selected-bun";
import { RootState } from "../services/store/store";
import { TIngredient } from "../utils/tab-array";
import { IIngredientsWithIdx } from "../types/ingredient-types";
import { useDispatchHook } from "../services/store/hooks";

type TCollectedProps = {
  isHover: boolean;
  ingredientType: TIngredient;
};

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatchHook();
  const navigate = useNavigate();

  const data = useSelector((store: RootState) => store.ingredients.ingredients);
  const selectedBun = useSelector(
    (store: RootState) => store.burgerConstructor.selectedBun
  );
  const selectedIngredients = useSelector(
    (store: RootState) => store.burgerConstructor.selectedIngredients
  );
  const orderList = useSelector(
    (store: RootState) => store.postOrder.orderList
  );
  const postRequest = useSelector(
    (store: RootState) => store.postOrder.postRequest
  );
  const user = useSelector((store: RootState) => store.user.user);
  const totalPrice = useSelector(
    (store: RootState) => store.burgerConstructor.totalPrice
  );

  const [showModal, setShowModal] = useState(false);

  const [{ isHover, ingredientType }, dropRef] = useDrop<
    IIngredientsWithIdx,
    unknown,
    TCollectedProps
  >({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      ingredientType: monitor.getItem()?.type,
    }),
    drop(item) {
      if (item.type === "bun") {
        dispatch(setBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
  });

  useEffect(() => {
    dispatch(calcTotalPrice());
  }, [dispatch, selectedBun, selectedIngredients]);

  const handlePostOrder = (): void => {
    if (user) {
      // Проверяем, что selectedBun и selectedIngredients не содержат null
      const validOrder = [selectedBun, ...selectedIngredients].filter(
        (item) => item !== null
      ) as IIngredientsWithIdx[];
      dispatch(handleAndPlaceOrder(validOrder));
      setShowModal(true);
    } else {
      navigate(ROUTE.mainLayout.login);
    }
  };

  const handleCloseOrderModal = (): void => {
    dispatch(resetConstructor());
    setShowModal(false);
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <div ref={dropRef}>
        <SelectedBun
          ingredientType={ingredientType}
          isHover={isHover}
          selectedBun={selectedBun}
          position="top"
        />
        <div className={styles.container}>
          {selectedIngredients.length ? (
            <ul className={styles.selectedIngredientList}>
              {selectedIngredients.map((selectedIngredient, index) => (
                <SelectedIngredient
                  index={index}
                  key={selectedIngredient?.idx}
                  selectedIngredient={selectedIngredient}
                />
              ))}
            </ul>
          ) : (
            <div
              className={`${styles.constructorElement} ${
                isHover && ingredientType !== "bun" && styles.borderClass
              }`}
            >
              <p className="text text_type_main-medium">Выберите начинку</p>
            </div>
          )}
        </div>
        <SelectedBun
          ingredientType={ingredientType}
          isHover={isHover}
          selectedBun={selectedBun}
          position="bottom"
        />
      </div>
      <div className={styles.cost_block}>
        <Cost cost={totalPrice} />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handlePostOrder}
          disabled={!selectedBun}
        >
          Оформить заказ
        </Button>
      </div>
      {postRequest ? (
        <p>Загрузка</p>
      ) : (
        showModal &&
        orderList && (
          <Modal onClose={handleCloseOrderModal}>
            <OrderDetails orderNumber={orderList.order.number} />
          </Modal>
        )
      )}
    </>
  );
};

export default BurgerConstructor;
