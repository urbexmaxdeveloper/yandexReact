import { FC, useEffect } from "react";
import styles from "./feed.module.css";
import {
  wsOrdersConnect,
  wsOrdersDisconnect,
} from "../../services/slices/feed-orders/feed-orders";
import { WEBSOCKET_API } from "../../utils/constants";
import { OrderFeed } from "../../OrderFeed/order-feed";
import { OrderStatistic } from "../../OrderStatistic/order-statistic";
import { useDispatchHook, useSelectorHook } from "../../services/store/hooks";

export const Feed: FC = () => {
  const dispatch = useDispatchHook();

  const allOrders = useSelectorHook((state) => state.feedOrders.orders);
  useEffect(() => {
    const url = `${WEBSOCKET_API.baseUrl}${WEBSOCKET_API.endpoints.allOrders}`;
    dispatch(wsOrdersConnect(url));

    return () => {
      dispatch(wsOrdersDisconnect());
    };
  }, [dispatch]);
  return (
    <div className={styles.feedPage}>
      <div>
        <h1 className="text text_type_main-large ml-10 ">Лента заказов</h1>
        <OrderFeed hasStatus={false} data={allOrders} />
      </div>
      <div>
        <OrderStatistic />
      </div>
    </div>
  );
};
