import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/Paper";

const styles = (theme) => {
    console.debug(`Palette: ${JSON.stringify(theme, null, 4)}.`);
    return {
    root: {
        padding: theme.spacing.unit * 1,
        boxShadow: "none",
        borderRadius: 0,
        border: `${theme.spacing.unit * 0.5}px solid ${theme.palette.grey[200]}`,
        backgroundColor: theme.palette.common.white
    },
}};

const MuiSelectedPaper = (props) => (
    <MuiPaper className={props.classes.root} {...props}>
        {props.children}
    </MuiPaper>
);

export default withStyles(styles)(MuiSelectedPaper);
