import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit * 1,
        boxShadow: "none",
        borderRadius: 0,
        backgroundColor: "#eee"
    },
});

const OverriddenPaper = (props) => (
    <Paper className={props.classes.root} {...props}>
        {props.children}
    </Paper>
);

export default withStyles(styles)(OverriddenPaper);
