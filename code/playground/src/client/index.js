import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "typeface-roboto";
import AppContainer from "../universal/react-components/container/AppContainer";
import "../universal/styles/app.scss";

const app = document.getElementById( "app" );
ReactDOM.hydrate(
    <Router>
        <AppContainer />
    </Router>,
    app
);
