import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "typeface-roboto";
import createStore from "../universal/store";
import AppContainer from "../universal/react-components/container/AppContainer";
import "../universal/styles/app.scss";

let store;
if (typeof(window.SSR_REDUX_STORE_STATE) === "undefined") {
    store = createStore();
} else {
    store = createStore(window.SSR_REDUX_STORE_STATE);
}

const app = document.getElementById( "app" );
ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <AppContainer />
        </Router>
    </Provider>,
    app
);
