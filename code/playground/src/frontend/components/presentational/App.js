import React from "react";
import MuiCssBaseline from "@material-ui/core/CssBaseline";
import MuiCard from "@material-ui/core/Card";
import MuiCardContent from "@material-ui/core/CardContent";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiGrid from "@material-ui/core/Grid";
import MuiTypography from "@material-ui/core/Typography";
import MuiButton from "@material-ui/core/Button";
import MuiPaper from "../muiOverrides/Paper";
import ConnectedListContainer from "../container/ListContainer";
import ConnectedFormContainer from "../container/FormContainer";

const App = ({handleSubmit, debugInfo}) => (
    <React.Fragment>
        <MuiCssBaseline />
        <MuiGrid container spacing={24} alignItems={"flex-start"} justify={"center"}>
            <MuiGrid item md={6}>
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
                            <MuiTypography variant={"body1"} component={"pre"}>
                                Debug info: {JSON.stringify(debugInfo)}
                            </MuiTypography>
                        </MuiPaper>
                    </MuiCardContent>
                </MuiCard>
            </MuiGrid>

            <MuiGrid item md={6}>
                <MuiCard>
                    <MuiCardHeader
                        title="Add a new article"
                    />
                    <MuiCardContent>
                        <ConnectedFormContainer />
                    </MuiCardContent>
                </MuiCard>
            </MuiGrid>
        </MuiGrid>
    </React.Fragment>
);

export default App;
