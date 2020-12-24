// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import App from './App';
// import './index.css';
// import stores from './stores';
// import reportWebVitals from "./reportWebVitals";
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import './index.css';
import store from './stores/store';
import reportWebVitals from "./reportWebVitals";

export const liffId = "1655423224-3qWQdzgM";
export const stubEnabled = process.env.NODE_ENV !== 'production';
ReactDOM.render(

    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
