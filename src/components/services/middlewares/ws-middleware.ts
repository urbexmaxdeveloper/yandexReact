import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from "@reduxjs/toolkit";
import {
  wsOrdersClosed,
  wsOrdersConnect,
  wsOrdersDisconnect,
  wsOrdersError,
  wsOrdersGetMessage,
  wsOrdersOpenSuccess,
} from "../../services/slices/feed-orders/feed-orders";
import {
  wsUserOrdClosed,
  wsUserOrdConnect,
  wsUserOrdDisconnect,
  wsUserOrdError,
  wsUserOrdGetMessage,
} from "../../services/slices/user-orders/user-orders";
import { refreshToken } from "../../utils/burger-api";

export type TActionsTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<any>;
};

const handleWebSocketEvent = (
  socket: WebSocket,
  dispatch: Function,
  wsActions: TActionsTypes
) => {
  socket.onopen = () => dispatch(wsActions.wsOpen());

  socket.onclose = () => dispatch(wsActions.wsClose());

  socket.onerror = () =>
    dispatch(wsActions.wsError("Oops! Connection has some error"));

  socket.onmessage = async (event: MessageEvent) => {
    try {
      const parsedData = JSON.parse(event.data);

      if (parsedData?.message === "Invalid or missing token") {
        try {
          await refreshToken();
        } catch (error) {
          console.error(`Token refresh failed: ${error}`);
        }
      } else {
        dispatch(wsActions.wsMessage(parsedData));
      }
    } catch (error) {
      console.error(`Error parsing message: ${error}`);
    }
  };
};

export const socketMiddleware =
  (wsOptions: TActionsTypes): Middleware<{}, unknown> =>
  (store) => {
    let socket: WebSocket | null = null;
    const { dispatch } = store;
    const { wsConnect, wsDisconnect, wsOpen, wsClose, wsError, wsMessage } =
      wsOptions;

    return (next) => (action) => {
      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        if (socket) {
          handleWebSocketEvent(socket, dispatch, wsOptions); // Передаем полный wsOptions
        }
      }

      if (wsDisconnect.match(action) && socket) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  };

export const feedOrdersMiddleware = socketMiddleware({
  wsConnect: wsOrdersConnect,
  wsClose: wsOrdersClosed,
  wsDisconnect: wsOrdersDisconnect,
  wsOpen: wsOrdersOpenSuccess,
  wsError: wsOrdersError,
  wsMessage: wsOrdersGetMessage,
});

export const userOrdersMiddleware = socketMiddleware({
  wsConnect: wsUserOrdConnect,
  wsClose: wsUserOrdClosed,
  wsDisconnect: wsUserOrdDisconnect,
  wsOpen: wsOrdersOpenSuccess,
  wsError: wsUserOrdError,
  wsMessage: wsUserOrdGetMessage,
});
