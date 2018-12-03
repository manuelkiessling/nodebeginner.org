import React from "react";
import PropTypes from "prop-types";
import MuiTypography from "@material-ui/core/Typography";
import MuiSelectedPaper from "./mui-overrides/MuiSelectedPaper";
import { withStyles } from "@material-ui/core/styles";
import { NoteEntity } from "../../entities/NoteEntity";
import EditNoteTitleControlContainer from "../container/EditNoteTitleControlContainer";
import EditNoteContentControlContainer from "../container/EditNoteContentControlContainer";

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit * 2,
        minHeight: "100%",
        minWidth: "100%",
        width: "100%"
    },
    editNoteTitleControlContainer: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        borderBottom: `1px solid ${theme.palette.grey[200]}`
    },
    metadata: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        borderBottom: `1px solid ${theme.palette.grey[200]}`
    }
});

const NoteListItemDetails = ({ note, classes }) => (
    <MuiSelectedPaper className={classes.root}>
        {note != null
        &&
        <div>
            <div className={classes.editNoteTitleControlContainer}>
                <EditNoteTitleControlContainer key={note.id} note={note} /> {/* "key" is crucial here - without it, the component is not replaced when switching between notes! */}
            </div>

            <div className={classes.metadata}>
                <div>
                    <MuiTypography variant="caption">
                        ID: {note.id}
                    </MuiTypography>
                </div>
                <div>
                    <MuiTypography variant="caption">
                        Last changed at: {note.lastModified}
                    </MuiTypography>
                </div>
            </div>

            <div>
                <EditNoteContentControlContainer key={note.id} note={note} />
            </div>
        </div>
        ||
        <MuiTypography variant="body1">
            "No note selected."
        </MuiTypography>}
    </MuiSelectedPaper>
);

NoteListItemDetails.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default withStyles(styles)(NoteListItemDetails);
