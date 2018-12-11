import React from "react";
import MuiCard from "@material-ui/core/Card";
import MuiCardContent from "@material-ui/core/CardContent";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiButton from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";

const LoginScreen = ({ username, password, handleChange, handleSubmit }) => (
    <MuiCard>
        <MuiCardHeader title="Login" />
            <MuiCardContent>
                <MuiTextField id="username" label="Username" variant="outlined" value={username} onChange={handleChange} fullWidth />
                <MuiTextField id="password" label="Password" variant="outlined" value={password} onChange={handleChange} fullWidth type="password" />

                <MuiButton color="secondary" variant="contained" aria-label="Log in" onClick={handleSubmit}>
                    Log in
                </MuiButton>

            </MuiCardContent>
    </MuiCard>
);

export default LoginScreen;
