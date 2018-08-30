import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
    paper: {
        padding: theme.spacing.unit * 1,
    },
});

function OverriddenPaper(props) {
    return (
        <Paper className={props.classes.paper} {...props}>
            {props.children}
        </Paper>
    );
}

export default withStyles(styles)(OverriddenPaper);
