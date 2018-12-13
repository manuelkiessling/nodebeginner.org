import React from "react";
import PropTypes from "prop-types";
import MuiListItem from "./mui-overrides/MuiListItem";
import MuiTypography from "@material-ui/core/Typography";
import { NoteEntity } from "../../entities/NoteEntity";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiHidden from "@material-ui/core/Hidden/Hidden";
import NoteListItemDetails from "./NoteListItemDetails";
import MuiSelectedPaper from "./mui-overrides/MuiSelectedPaper";
import MuiDeselectedPaper from "./mui-overrides/MuiDeselectedPaper";
import { withStyles } from "@material-ui/core/styles";
import NoteSyncStatusIndicatorContainer from "../container/NoteSyncStatusIndicatorContainer";

const styles = (theme) => ({
    rootSelected: {
        margin: 0,
        border: `${theme.spacing.unit * 0.5}px solid ${theme.palette.grey[50]}`,
        backgroundColor: theme.palette.grey[50]
    },
    rootDeselected: {
        margin: 0,
        cursor: "pointer",
        borderBottom: `1px solid ${theme.palette.grey[200]}`
    },
    paddingDetails: {
        paddingBottom: theme.spacing.unit * 1
    },
    selectedPaper: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        wordBreak: "break-all",
    },
    deselectedPaper: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        wordBreak: "break-all"
    }
});

const NoteListItemSummary = ({ note, selectedNoteId }) => (
    <div>
        <MuiTypography variant="h6" color="textPrimary">
            {note.title}
        </MuiTypography>
        <MuiTypography variant="caption" color={selectedNoteId === note.id && "textPrimary" || "textSecondary"}>
            <NoteSyncStatusIndicatorContainer note={note} />
            {(new Date(note.lastModified)).toLocaleString()}
        </MuiTypography>
    </div>
);

const NoteListItem = ({ note, selectedNoteId, handleSelectNote, classes }) => (
    <MuiListItem onClick={() => handleSelectNote(note)} className={selectedNoteId === note.id && classes.rootSelected || classes.rootDeselected}>
        <MuiGrid container direction="column" alignItems="stretch" justify="space-evenly">

            <MuiHidden xsDown={selectedNoteId === note.id} implementation="css">
                <MuiGrid item>
                    {selectedNoteId === note.id
                    &&
                    <MuiSelectedPaper className={classes.selectedPaper}>
                        <NoteListItemSummary note={note} selectedNoteId={selectedNoteId} />
                    </MuiSelectedPaper>
                    ||
                    <MuiDeselectedPaper className={classes.deselectedPaper}>
                        <NoteListItemSummary note={note} selectedNoteId={selectedNoteId} />
                    </MuiDeselectedPaper>}
                </MuiGrid>
            </MuiHidden>

            {selectedNoteId === note.id &&
            <MuiHidden smUp implementation="css">
                <MuiGrid item className={classes.paddingDetails}>
                    <NoteListItemDetails note={note} contrasted={true} />
                </MuiGrid>
            </MuiHidden>}

        </MuiGrid>
    </MuiListItem>
);

NoteListItem.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default withStyles(styles)(NoteListItem);
