import { reducerWithInitialState } from "typescript-fsa-reducers";
import { WebSocketActions } from "./actions/SocketAction";
import { wsEndpoint } from "./constants";

const SOCKET_CONNECTION_INIT = 'SOCKET_CONNECTION_INIT';
const SOCKET_CONNECTION_SUCESS = 'SOCKET_CONNECTION_SUCCESS';
const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR';
const SOCKET_CONNECTION_CLOSED = 'SOCKET_CONNECTION_CLOSED';
const SOCKET_MESSAGE = 'SOCKET_MESSAGE';


export var socket: WebSocket = new WebSocket(wsEndpoint)

socket.onopen = function (ev) {
    //  console.log("Success")
}
socket.onerror = function (ev) {
    //  console.log("Error")
}
socket.onclose = function (ev) {
    //  console.log(ev.code)
    //  console.log("Reconnect")
    //  socket = new WebSocket(wsEndpoint)
    createConnect()
}
socket.onmessage = function (ev) {
//    console.log(ev.data)
}

function createConnect() {
    socket = new WebSocket(wsEndpoint)
    socket.onopen = function (ev) {
        console.log("Success")
    }
    socket.onerror = function (ev) {
        console.log("Error")
    }
    socket.onclose = function (ev) {
        console.log(ev.code)
    }
    socket.onmessage = function (ev) {
        console.log(ev.data)
    }
}

// //10秒ごとにコネクションチェック
// cron.schedule('*/10 * * * * *', () => {
//         console.log('毎分1秒~10秒に実行');
//         if (socket.readyState === WebSocket.CLOSED) {
//             socket = createInstance()
//         }
//     }
// );


// dispatch(socketConnectionInit(socket));

export interface SocketState {
    connected: boolean,
    readyState: string,
    socket: WebSocket | null
}

const initialState: SocketState = {
    connected: false,
    readyState: "",
    socket: null,
};


export const SocketReducer = reducerWithInitialState(initialState)
    .case(WebSocketActions.socketConnectionInit, (state, websocket: WebSocket) => {
        return { ...state, socket: websocket }
    })
    .case(WebSocketActions.socketConnectionSuccess, (state: SocketState, connected: boolean) => {
        return { ...state, connected: connected }
    }
    )
    .case(WebSocketActions.socketConnectionError, (state: SocketState, connected: boolean) => {
        return { ...state, connected: connected }
    }
    ).case(WebSocketActions.socketConnectionClosed, (state: SocketState) => {
        return { ...state }
    }
    ).case(WebSocketActions.socketMessage, (state: SocketState, message: string) => {
        return { ...state, message }
    }
    )

// export function initializeSocket() {
//     return (dispatch: Dispatch) => {
//         const socket = new WebSocket('ws://foo.com');
//         dispatch(socketConnectionInit(socket));
//
//         socket.onopen = function () {
//             dispatch(socketConnectionSuccess());
//         };
//
//         socket.onerror = function () {
//             dispatch(socketConnectionError());
//         };
//
//         socket.onmessage = function (event) {
//             dispatch(socketMessage(event.data));
//         };
//
//         socket.onclose = function () {
//             dispatch(socketConnectionClosed());
//         };
//     };
// }

function socketConnectionInit(socket: WebSocket) {
    return {
        type: SOCKET_CONNECTION_INIT,
        socket,
    };
}

function socketConnectionSuccess() {
    return {
        type: SOCKET_CONNECTION_SUCESS,
    };
}

function socketConnectionError() {
    return {
        type: SOCKET_CONNECTION_ERROR,
    };
}

function socketConnectionClosed() {
    return {
        type: SOCKET_CONNECTION_CLOSED,
    };
}

function socketMessage(data: string) {
    return {
        type: SOCKET_MESSAGE,
        data,
    };
}
