import React from "react";
import MuiCssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TasksScreen from "./TasksScreen";

const App = () => (
    <Router>
        <React.Fragment>
            <MuiCssBaseline />
            <TasksScreen />
        </React.Fragment>
    </Router>
);

export default App;
