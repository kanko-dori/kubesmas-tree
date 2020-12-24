import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import {initialState, Reducer, State} from '../reducer'
import thunk from "redux-thunk"
import {SocketReducer, SocketState} from "../socket";

export type AppState = {
    state: State,
    socket: SocketState
}

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers<AppState>({
        state: Reducer,
        socket: SocketReducer
    }),
    storeEnhancers(applyMiddleware(thunk))
)


export default store