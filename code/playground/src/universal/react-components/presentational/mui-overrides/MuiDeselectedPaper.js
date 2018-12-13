import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/es/Paper/Paper";

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit * 1,
        boxShadow: "none",
        borderRadius: 0,
    },
});

const MuiDeselectedPaper = (props) => (
    <MuiPaper className={props.classes.root} {...props}>
        {props.children}
    </MuiPaper>
);

export default withStyles(styles)(MuiDeselectedPaper);
