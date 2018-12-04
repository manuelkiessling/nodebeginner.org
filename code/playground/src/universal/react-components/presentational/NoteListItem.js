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

const styles = (theme) => ({
    root: {
        marginBottom: 0
    },
    rootWithPointer: {
        marginBottom: 0,
        cursor: "pointer"
    },
    paddingDetails: {
        marginTop: theme.spacing.unit * -5,
        paddingBottom: theme.spacing.unit * 5
    },
    paddingSelected: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        wordBreak: "break-all"
    },
    paddingDeselected: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        wordBreak: "break-all"
    }
});

const NoteListItemSummary = ({ note, selectedNoteId }) => (
    <MuiHidden xsDown={selectedNoteId === note.id}>
        <div>
            <MuiTypography variant="h6" color="textPrimary">
                {note.title}
            </MuiTypography>
            <MuiTypography variant="caption" color={selectedNoteId === note.id && "textPrimary" || "textSecondary"}>
                {(new Date(note.lastModified)).toLocaleString()}
            </MuiTypography>
        </div>
    </MuiHidden>
);

const NoteListItem = ({ note, selectedNoteId, handleSelectNote, classes }) => (
    <MuiListItem onClick={() => handleSelectNote(note)} className={selectedNoteId === note.id && classes.root || classes.rootWithPointer}>
        <MuiGrid container direction="column" alignItems="stretch" justify="space-evenly">

            <MuiGrid item>
                {selectedNoteId === note.id &&
                <MuiSelectedPaper className={classes.paddingSelected}>
                    <NoteListItemSummary note={note} selectedNoteId={selectedNoteId} />
                </MuiSelectedPaper> ||
                <MuiDeselectedPaper className={classes.paddingDeselected}>
                    <NoteListItemSummary note={note} selectedNoteId={selectedNoteId} />
                </MuiDeselectedPaper>}
            </MuiGrid>

            {selectedNoteId === note.id &&
            <MuiHidden smUp>
                <MuiGrid item className={classes.paddingDetails}>
                    <NoteListItemDetails note={note} />
                </MuiGrid>
            </MuiHidden>}

        </MuiGrid>
    </MuiListItem>
);

NoteListItem.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default withStyles(styles)(NoteListItem);
