import { useEffect, useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router";
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

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((store) => store.ingredients.ingredients);
  const selectedBun = useSelector(
    (store) => store.burgerConstructor.selectedBun
  );
  const selectedIngredients = useSelector(
    (store) => store.burgerConstructor.selectedIngredients
  );
  const orderList = useSelector((store) => store.postOrder.orderList);
  const postRequest = useSelector((store) => store.postOrder.postRequest);
  const user = useSelector((store) => store.user.user);
  const totalPrice = useSelector((store) => store.burgerConstructor.totalPrice);

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

  const handlePostOrder = () => {
    if (user) {
      const order = [selectedBun, ...selectedIngredients];
      dispatch(handleAndPlaceOrder(order));
      setShowModal(true);
    } else {
      navigate(ROUTE.mainLayout.login);
    }
  };

  const handleCloseOrderModal = () => {
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
