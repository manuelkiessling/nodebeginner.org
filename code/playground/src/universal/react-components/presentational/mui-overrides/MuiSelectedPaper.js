import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/Paper";

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit * 1,
        boxShadow: "none",
        borderRadius: 0,
        backgroundColor: theme.palette.grey[0]
    },
});

const MuiSelectedPaper = (props) => (
    <MuiPaper className={props.classes.root} {...props}>
        {props.children}
    </MuiPaper>
);

export default withStyles(styles)(MuiSelectedPaper);
