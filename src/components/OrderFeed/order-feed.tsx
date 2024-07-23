import { FC } from "react";
import styles from "./order-feed.module.css";
import { OrderCard } from "../OrderCard/order-card";
import { IWsOrder } from "../types/order-types";

type TOrderFeedProps = {
  data: IWsOrder[];
  hasStatus: boolean;
};

export const OrderFeed: FC<TOrderFeedProps> = ({ data, hasStatus }) => {
  if (data.length === 0) {
    return <p>Нет данных</p>;
  }

  return (
    <section className={styles.orderFeed}>
      <ul className={styles.orderList}>
        {data.map((order) => (
          <OrderCard hasStatus={hasStatus} order={order} key={order._id} />
        ))}
      </ul>
    </section>
  );
};
