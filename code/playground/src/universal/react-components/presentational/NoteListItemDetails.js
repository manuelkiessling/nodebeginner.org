import React from "react";
import PropTypes from "prop-types";
import MuiTypography from "@material-ui/core/Typography";
import MuiPaper from "@material-ui/core/es/Paper/Paper";
import { withStyles } from "@material-ui/core/styles";
import { NoteEntity } from "../../entities/NoteEntity";

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit * 4,
        minHeight: "100%",
        maxHeight: "100vh",
        minWidth: "100%"
    },
});

const NoteListItemDetails = ({ note, classes }) => (
    <MuiPaper className={classes.root}>
        {note != null &&

        <MuiTypography variant="caption" color="textSecondary">
            {note.id}
            -
            {note.title}
            -
            {note.lastModified}
        </MuiTypography>}
    </MuiPaper>
);

NoteListItemDetails.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default withStyles(styles)(NoteListItemDetails);
