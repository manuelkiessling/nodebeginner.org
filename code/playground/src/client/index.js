import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "typeface-roboto";
import createStore from "../universal/store";
import AppContainer from "../universal/react-components/container/AppContainer";
import "../universal/styles/app.scss";
import muiTheme from "../universal/mui-theme"

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
            <MuiThemeProvider theme={muiTheme}>
                <AppContainer />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    app
);
