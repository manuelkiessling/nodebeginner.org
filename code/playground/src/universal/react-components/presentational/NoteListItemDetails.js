import React from "react";
import PropTypes from "prop-types";
import MuiTypography from "@material-ui/core/Typography";
import MuiSelectedPaper from "./mui-overrides/MuiSelectedPaper";
import { withStyles } from "@material-ui/core/styles";
import { NoteEntity } from "../../entities/NoteEntity";
import EditNoteTitleControlContainer from "../container/EditNoteTitleControlContainer";

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit * 1,
        minHeight: "100%",
        minWidth: "100%",
        width: "100%"
    },
    editNoteTitleControlContainer: {
        marginTop: theme.spacing.unit * 2,
    }
});

const NoteListItemDetails = ({ note, classes }) => (
    <MuiSelectedPaper className={classes.root}>
        {note != null &&
        <div>
            <div>
                <div>
                    <MuiTypography variant="caption">
                        {note.id}
                    </MuiTypography>
                </div>
                <div>
                    <MuiTypography variant="caption">
                        {note.lastModified}
                    </MuiTypography>
                </div>
            </div>

            <div className={classes.editNoteTitleControlContainer}>
                <EditNoteTitleControlContainer note={note} />
            </div>
        </div>}
    </MuiSelectedPaper>
);

NoteListItemDetails.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default withStyles(styles)(NoteListItemDetails);
