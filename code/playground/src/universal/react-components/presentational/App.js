import React from "react";
import MuiCssBaseline from "@material-ui/core/CssBaseline";
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import { Route, Switch } from "react-router-dom";
import routes from "../../routes";

const App = () => (
    <React.Fragment>

        <MuiCssBaseline />

        <Switch>
            { routes.map( route => <Route key={ route.path } { ...route } /> ) }
        </Switch>

    </React.Fragment>
);

export default App;
