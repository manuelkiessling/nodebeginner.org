import React from "react";
import MuiCssBaseline from "@material-ui/core/CssBaseline";
import MuiCard from "@material-ui/core/Card";
import MuiCardContent from "@material-ui/core/CardContent";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiGrid from "@material-ui/core/Grid";
import MuiTypography from "@material-ui/core/Typography";
import MuiButton from "@material-ui/core/Button";
import MuiPaper from "./muiOverrides/Paper";
import ConnectedListContainer from "../container/TaskListContainer";
import ConnectedFormContainer from "../container/FormContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = ({handleSubmit, debugInfo}) => (
    <Router>
        <React.Fragment>
            <MuiCssBaseline />
            <MuiGrid container spacing="24" alignItems="flex-start" justify="center">
                <MuiGrid item md="6">
                    <MuiCard>
                        <MuiCardHeader
                            title="Articles"
                        />
                        <MuiCardContent>
                            <MuiButton type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                                Fetch
                            </MuiButton>
                            <ConnectedListContainer />
                            <MuiPaper>
                                <MuiTypography variant="body1" component="pre">
                                    Debug info: {JSON.stringify(debugInfo)}
                                </MuiTypography>
                            </MuiPaper>
                            <Link to="/">
                                <MuiButton color="primary">HOME</MuiButton>
                            </Link>
                            <Link to="/add">
                                <MuiButton color="primary">ADD</MuiButton>
                            </Link>
                        </MuiCardContent>
                    </MuiCard>
                </MuiGrid>

                <Route path="/add" component={ConnectedFormContainer} />
            </MuiGrid>
        </React.Fragment>
    </Router>
);

export default App;
