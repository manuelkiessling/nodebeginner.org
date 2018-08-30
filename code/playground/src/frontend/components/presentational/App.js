import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "../muiOverrides/Paper";
import ConnectedListContainer from "../container/ListContainer";
import ConnectedFormContainer from "../container/FormContainer";

const App = ({handleSubmit, debugInfo}) => (
    <React.Fragment>
        <CssBaseline />
        <Grid container spacing={24} alignItems={"flex-start"} justify={"center"}>
            <Grid item md={6}>
                <Card>
                    <CardHeader
                        title="Articles"
                    />
                    <CardContent>
                        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                            Fetch
                        </Button>
                        <ConnectedListContainer />
                        <Paper>
                            <Typography variant={"body1"} component={"pre"}>
                                Debug info: {JSON.stringify(debugInfo)}
                            </Typography>
                        </Paper>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item md={6}>
                <Card>
                    <CardHeader
                        title="Add a new article"
                    />
                    <CardContent>
                        <ConnectedFormContainer />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </React.Fragment>
);

export default App;
