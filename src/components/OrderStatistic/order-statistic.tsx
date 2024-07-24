import styles from "./order-statistic.module.css";
import { useMemo } from "react";
import { useSelectorHook } from "../services/store/hooks";

export const OrderStatistic = () => {
  const { orders, orderResponse } = useSelectorHook((store) => ({
    orders: store.feedOrders.orders,
    orderResponse: store.feedOrders.orderResponse,
  }));

  const { readyOrders, inProgressOrders } = useMemo(() => {
    const initialState = {
      readyOrders: [] as Array<number>,
      inProgressOrders: [] as Array<number>,
    };

    return orders.reduce((acc, order) => {
      if (order.status === "done") {
        acc.readyOrders.push(order.number);
      } else if (order.status === "pending") {
        acc.inProgressOrders.push(order.number);
      }
      return acc;
    }, initialState);
  }, [orders]);

  const renderOrders = (orders: Array<number>, className: string) => (
    <div className={styles.column}>
      <h3 className="text text_type_main-medium mb-6">
        {className === styles.primary ? "Готовы:" : "В работе:"}
      </h3>
      <div className={styles.statisticBoard}>
        {orders.slice(0, 10).map((order, index) => (
          <span
            className={`${className} text text_type_main-medium`}
            key={index}
          >
            {order}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.orderStatistics}>
      <div className={`${styles.onlineOrdersStats} mb-15`}>
        {renderOrders(readyOrders, styles.primary)}
        {renderOrders(inProgressOrders, "")}
      </div>
      <div className="mb-15">
        <h2 className="text text_type_main-medium">Выполнено за всё время</h2>
        <span className="text text_type_digits-large">
          {orderResponse?.total}
        </span>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня</h2>
        <span className="text text_type_digits-large">
          {orderResponse?.totalToday}
        </span>
      </div>
    </section>
  );
};
