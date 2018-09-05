import React from "react";
import MuiCssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TasksScreen from "./TasksScreen";
import LoginScreen from "./LoginScreen";

const App = () => (
    <Router>
        <React.Fragment>

            <MuiCssBaseline />

            <Route exact path="/" component={LoginScreen} />

            <Route exact path="/tasks" component={TasksScreen} />

        </React.Fragment>
    </Router>
);

export default App;
