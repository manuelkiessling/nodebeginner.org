import React from "react";
import { render } from "react-dom"
import { Provider } from "react-redux"
import "typeface-roboto";
import store from "./store"
import ConnectedAppContainer from "./components/container/AppContainer";
import "../styles/app.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={ConnectedAppContainer}/>
        </Router>
    </Provider>,
    document.getElementById("app")
);
