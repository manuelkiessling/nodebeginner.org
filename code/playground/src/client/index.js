import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "typeface-roboto";
import createStore from "../universal/redux-state/store";
import AppContainer from "../universal/react-components/container/AppContainer";
import "../universal/styling/app.scss";
import muiTheme from "../universal/styling/mui-theme"
import { getEnvVar } from "../universal/utils/env";
import {
    mergeSsrAndLocalStorageState,
    retrieveStateFromLocalStorage,
    setUpLocalStorageStoreSubscription
} from "./syncHelpers";

let store;
if (typeof(window.SSR_REDUX_STORE_STATE) === "undefined") {
    store = createStore(mergeSsrAndLocalStorageState(null, retrieveStateFromLocalStorage()));
} else {
    store = createStore(window.SSR_REDUX_STORE_STATE, retrieveStateFromLocalStorage());
}

setUpLocalStorageStoreSubscription(store);

const appDom = (
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={muiTheme}>
                <AppContainer />
            </MuiThemeProvider>
        </Router>
    </Provider>);

const app = document.getElementById("app");

if (getEnvVar("SSR", "false") === "false") {
    ReactDOM.render(
        appDom,
        app
    );
} else {
    ReactDOM.hydrate(
        appDom,
        app
    );
}
