import actionCreatorFactory from "typescript-fsa";

export const SOCKET_CONNECTION_INIT = 'SOCKET_CONNECTION_INIT';
export const SOCKET_CONNECTION_SUCESS = 'SOCKET_CONNECTION_SUCCESS';
export const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR';
export const SOCKET_CONNECTION_CLOSED = 'SOCKET_CONNECTION_CLOSED';
export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';
const actionCreator = actionCreatorFactory()


export const WebSocketActions = {
    socketConnectionInit: actionCreator<WebSocket>('SOCKET_CONNECTION_INIT'),
    socketConnectionSuccess: actionCreator<boolean>('SOCKET_CONNECTION_SUCCESS'),
    socketConnectionError: actionCreator<boolean>('SOCKET_CONNECTION_ERROR'),
    socketConnectionClosed: actionCreator('SOCKET_CONNECTION_CLOSED'),
    socketMessage: actionCreator<string>('SOCKET_MESSAGE'),
    socketSendSMessage: actionCreator('SOCKET_SEND')
}