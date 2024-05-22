import { useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-contructor.module.css";
import Cost from "./cost/cost";
import BurgerComponent from "./burger-component/burger-component";
import Modal from "../Modal/modal";
import OrderDetails from "../OrderDetails/order-details";
import PropTypes from "prop-types";

export default function BurgerConstructor({ data }) {
  const filteredBuns = data.data.filter((item) => item.type === "bun");
  const filteredSauces = data.data.filter((item) => item.type === "sauce");
  const filteredMains = data.data.filter((item) => item.type === "main");
  const [showModal, setShowModal] = useState(false);
  const onModalClosed = () => {
    setShowModal(false);
  };
  if (data.length === 0) {
    return null;
  }
  return (
    <>
      <BurgerComponent component={filteredBuns[0]} type="top" />
      <div className={styles.container}>
        <BurgerComponent component={filteredSauces[0]} isDrag={true} />
        <BurgerComponent component={filteredMains[0]} isDrag={true} />
        <BurgerComponent component={filteredSauces[0]} isDrag={true} />
        <BurgerComponent component={filteredSauces[1]} isDrag={true} />
        <BurgerComponent component={filteredMains[1]} isDrag={true} />
        <BurgerComponent component={filteredSauces[1]} isDrag={true} />
        <BurgerComponent component={filteredSauces[2]} isDrag={true} />
        <BurgerComponent component={filteredMains[2]} isDrag={true} />
        <BurgerComponent component={filteredSauces[2]} isDrag={true} />
      </div>
      <BurgerComponent component={filteredBuns[0]} type="bottom" />
      <div className={styles.cost_block}>
        <Cost cost="600" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => setShowModal(true)}
        >
          Оформить заказ
        </Button>
        <Modal
          isOpen={showModal}
          setIsModalOpen={onModalClosed}
          width={720}
          height={718}
        >
          <OrderDetails />
        </Modal>
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
      })
    ),
  }),
};
