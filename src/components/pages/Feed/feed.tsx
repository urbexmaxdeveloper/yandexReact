import { FC, useEffect } from "react";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsOrdersConnect,
  wsOrdersDisconnect,
} from "../../services/slices/feed-orders/feed-orders";
import { WEBSOCKET_API } from "../../utils/constants";
import { RootState } from "../../services/store/store";
import { OrderFeed } from "../../OrderFeed/order-feed";
import { OrderStatistic } from "../../OrderStatistic/order-statistic";

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const allOrders = useSelector((state: RootState) => state.feedOrders.orders);
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
