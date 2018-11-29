import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";

const styles = (theme) => ({
    root: {
        padding: 0,
        marginBottom: theme.spacing.unit * 4
    },
});

const OverriddenListItem = (props) => (
    <ListItem className={props.classes.root} {...props}>
        {props.children}
    </ListItem>
);

export default withStyles(styles)(OverriddenListItem);
