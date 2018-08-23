import React from "react";
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "./store"
import AppContainer from "./components/container/AppContainer";
import "../styles/app.scss";

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("app")
);
