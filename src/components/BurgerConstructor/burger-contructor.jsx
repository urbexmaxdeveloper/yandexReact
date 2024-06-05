import { useEffect, useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-contructor.module.css";
import Cost from "./cost/cost";
import Modal from "../Modal/modal";
import OrderDetails from "../OrderDetails/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { SelectedBun } from "./selected-bun/selected-bun";
import { SelectedIngredient } from "./selected-ingredient/selected-ingredient";
import {
  calcTotalPrice,
  resetConstructor,
  setBun,
  addIngredient,
} from "../services/slices/burger-constructor/burger-constructor";
import { handleAndPlaceOrder } from "../services/slices/order-post-slice/order-post";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredients.ingredients);
  const selectedBun = useSelector(
    (store) => store.burgerConstructor.selectedBun
  );
  const selectedIngredients = useSelector(
    (store) => store.burgerConstructor.selectedIngredients
  );
  const orderList = useSelector((store) => store.postOrder.orderList);
  const postRequest = useSelector((store) => store.postOrder.postRequest);

  const [showModal, setShowModal] = useState(false);

  const [{ isHover, ingredientType }, dropRef] = useDrop({
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

  const totalPrice = useSelector((store) => store.burgerConstructor.totalPrice);

  const handlePostOrder = () => {
    const order = [selectedBun, ...selectedIngredients];
    dispatch(handleAndPlaceOrder(order));
    setShowModal(true);
  };

  const onModalClosed = () => {
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
              } `}
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
          <Modal
            isOpen={showModal}
            setIsModalOpen={onModalClosed}
            width={720}
            height={718}
          >
            <OrderDetails orderNumber={orderList.order.number} />
          </Modal>
        )
      )}
    </>
  );
}
