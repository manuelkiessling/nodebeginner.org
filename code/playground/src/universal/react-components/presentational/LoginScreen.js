import React from "react";
import MuiCard from "@material-ui/core/Card";
import MuiCardContent from "@material-ui/core/CardContent";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiButton from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const LoginScreen = () => (
    <MuiCard>
        <MuiCardHeader title="Login" />
            <MuiCardContent>
                <MuiButton
                    component={Link}
                    to="/notes"
                    color="primary"
                    variant="contained"
                >
                    Log in
                </MuiButton>
            </MuiCardContent>
    </MuiCard>
);

export default LoginScreen;
