import React from "react";
import MuiCssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import TasksScreen from "./TasksScreen";
import LoginScreen from "./LoginScreen";

const App = () => (
    <React.Fragment>

        <MuiCssBaseline />

        <Route exact path="/" component={LoginScreen} />

        <Route exact path="/tasks" component={TasksScreen} />

    </React.Fragment>
);

export default App;
