import { FC, useEffect } from "react";
import styles from "./profile-orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  wsUserOrdConnect as connect,
  wsUserOrdDisconnect as disconnect,
} from "../../services/slices/user-orders/user-orders";
import { OrderFeed } from "../../OrderFeed/order-feed";
import { WEBSOCKET_API } from "../../utils/constants";
import { cookies } from "../../services/slices/user-slice/auth";
import { RootState } from "../../services/store/store";

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookies.get("accessToken");

    if (token) {
      const url = `${WEBSOCKET_API.baseUrl}${WEBSOCKET_API.endpoints.profileOrders}?token=${token}`;
      dispatch(connect(url));

      return () => {
        dispatch(disconnect());
      };
    } else {
      console.error("Token is missing or invalid.");
    }
  }, [dispatch]);

  const userOrders = useSelector((state: RootState) => state.userOrders.orders);

  return (
    <div className={styles.profileOrders}>
      <OrderFeed hasStatus={true} data={userOrders.slice().reverse()} />
    </div>
  );
};
