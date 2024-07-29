import React from "react";
import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface OrderDetailsProps {
  orderNumber: number;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber }) => {
  return (
    <div  data-cy="order-details">
      <p className={`${styles.orderNum} text text_type_digits-large`}>
        {orderNumber}
      </p>
      <div className={styles.order_number_title}>
        <h4 className="text text_type_main-medium">идентификатор заказа</h4>
      </div>
      <div className={styles.check_mark}>
        <CheckMarkIcon type="primary" />
      </div>
      <div className={styles.orderDescr}>
        <p className="text text_type_main-default text_color_primary">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
