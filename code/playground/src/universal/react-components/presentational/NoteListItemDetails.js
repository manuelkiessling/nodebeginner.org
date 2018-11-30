import React from "react";
import PropTypes from "prop-types";
import MuiTypography from "@material-ui/core/Typography";
import MuiSelectedPaper from "./mui-overrides/MuiSelectedPaper";
import { withStyles } from "@material-ui/core/styles";
import { NoteEntity } from "../../entities/NoteEntity";

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit * 1,
        minHeight: "100%",
        minWidth: "100%",
        width: "100%"
    },
});

const NoteListItemDetails = ({ note, classes }) => (
    <MuiSelectedPaper className={classes.root}>
        {note != null &&

        <MuiTypography variant="caption" color="textSecondary">
            {note.id}
            <br/>
            {note.title}
            <br/>
            {note.lastModified}
        </MuiTypography>}
    </MuiSelectedPaper>
);

NoteListItemDetails.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default withStyles(styles)(NoteListItemDetails);
