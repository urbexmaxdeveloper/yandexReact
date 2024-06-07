import styles from "./order-details.module.css";
import PropTypes from "prop-types";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderDetails({ orderNumber }) {
  return (
    <div className={styles.root}>
      <div className={styles.order_number}>
        <p className="text text_type_digits-large"> {orderNumber}</p>
      </div>
      <div className={styles.order_number_title}>
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>
      <div className={styles.check_mark}>
        <CheckMarkIcon type="primary" />
      </div>
      <div className={styles.order_status}>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};
