import React from "react";
import { render } from "react-dom"
import { Provider } from "react-redux"
import "typeface-roboto";
import store from "./store"
import ConnectedAppContainer from "./components/container/AppContainer";
import "../styles/app.scss";

render(
    <Provider store={store}>
        <ConnectedAppContainer />
    </Provider>,
    document.getElementById("app")
);
