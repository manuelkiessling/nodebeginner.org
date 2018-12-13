import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "typeface-roboto";
import { createStoreFromInitialState, mergeStatesAndRecalculate } from "../universal/redux-state/store";
import AppContainer from "../universal/react-components/container/AppContainer";
import "../universal/styling/app.scss";
import muiTheme from "../universal/styling/muiTheme"
import { retrieveStateFromLocalStorage, setUpLocalStorageStoreSubscription } from "./localStorage";
import activateServerSync from "./serverSync";

let store;
if (window.SSR_REDUX_STORE_STATE == null) {
    console.info("Attempting to build initial store state from localStorage, without SSR state");
    store = createStoreFromInitialState(
        mergeStatesAndRecalculate(
            null,
            retrieveStateFromLocalStorage()
        )
    );
} else {
    console.info("Attempting to build initial store state from localStorage and SSR state");
    store = createStoreFromInitialState(
        mergeStatesAndRecalculate(
            window.SSR_REDUX_STORE_STATE,
            retrieveStateFromLocalStorage()
        )
    );
}

setUpLocalStorageStoreSubscription(store);
activateServerSync(store);

const appDom = (
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={muiTheme}>
                <AppContainer />
            </MuiThemeProvider>
        </Router>
    </Provider>);

const app = document.getElementById("app");

if (window.SSR_REDUX_STORE_STATE == null) {
    console.info("Not in SSR mode, rendering the React DOM from scratch.");
    ReactDOM.render(
        appDom,
        app
    );
} else {
    console.info("SSR mode, hydrating an existing server-side rendered React DOM.");
    ReactDOM.hydrate(
        appDom,
        app
    );
}
