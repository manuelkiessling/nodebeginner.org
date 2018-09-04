import React from "react";
import { render } from "react-dom"
import { Provider } from "react-redux"
import "typeface-roboto";
import store from "../universal/store"
import ConnectedAppContainer from "../universal/react-components/container/AppContainer";
import "../universal/styles/app.scss";

render(
    <Provider store={store}>
        <ConnectedAppContainer/>
    </Provider>,
    document.getElementById("app")
);
