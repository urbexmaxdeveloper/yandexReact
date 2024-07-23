import { FC, useMemo } from "react";
import styles from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IWsOrder } from "../types/order-types";
import { useSelectorHook } from "../services/store/hooks";
import { OrderIcons } from "./OrderIcons/order-icons";
import { ORDER_STATUS } from "../utils/constants";

type TOrderCardProps = {
  order: IWsOrder;
  hasStatus: boolean;
};

export const OrderCard: FC<TOrderCardProps> = ({ hasStatus, order }) => {
  const ingredients = useSelectorHook((store) => store.ingredients.ingredients);
  const location = useLocation();

  const { price, orderIcons } = useMemo(() => {
    const initialState = {
      price: 0 as number,
      orderIcons: [] as Array<string>,
    };

    return order.ingredients.reduce((acc, item) => {
      const ingredient = ingredients.find(
        (ingredient) => ingredient._id === item
      );
      if (ingredient) {
        acc.orderIcons.push(ingredient.image_mobile);
        acc.price += ingredient.price;
      }
      return acc;
    }, initialState);
  }, [order]);

  return (
    <Link
      to={order._id}
      state={{ background: location, totalPrice: price }}
      className={`${styles.orderCard} `}
    >
      <div className={styles.cardWrapper}>
        <header className={styles.heading}>
          <p className="text text_type_digits-default">{`#${order?.number}`}</p>
          <FormattedDate
            className="text text_type_main-default text_color_inactive"
            date={new Date(order?.createdAt)}
          />
        </header>
        <h4 className={`${styles.title} text text_type_main-medium`}>
          {order.name}
        </h4>
        {hasStatus && (
          <div className={styles.status}>
            <p className="text text_type_main-default">
              {ORDER_STATUS[order.status]}
            </p>
          </div>
        )}
        <div className={styles.orderInfo}>
          <OrderIcons icons={orderIcons} />
          <div className={styles.orderPrice}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
