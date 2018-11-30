import React from "react";
import PropTypes from "prop-types";
import MuiListItem from "./mui-overrides/ListItem";
import MuiTypography from "@material-ui/core/Typography";
import { NoteEntity } from "../../entities/NoteEntity";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiHidden from "@material-ui/core/Hidden/Hidden";
import NoteListItemDetails from "./NoteListItemDetails";
import MuiSelectedPaper from "./mui-overrides/MuiSelectedPaper";
import MuiDeselectedPaper from "./mui-overrides/MuiDeselectedPaper";

const NoteListItemSummary = ({ note, selectedNoteId }) => (
    <div>
        <MuiTypography variant="h6" color="textPrimary">
            {note.title}
        </MuiTypography>
        <MuiTypography variant="caption" color={selectedNoteId === note.id && "textPrimary" || "textSecondary"}>
            {note.id}
        </MuiTypography>
    </div>
);

const NoteListItem = ({ note, selectedNoteId, handleSelectNote }) => (
    <MuiListItem onClick={() => handleSelectNote(note)}>
        <MuiGrid container direction="column" alignItems="stretch" justify="space-evenly">

            <MuiGrid item>
                {selectedNoteId === note.id &&
                <MuiSelectedPaper>
                    <NoteListItemSummary note={note} selectedNoteId={selectedNoteId} />
                </MuiSelectedPaper> ||
                <MuiDeselectedPaper>
                    <NoteListItemSummary note={note} selectedNoteId={selectedNoteId} />
                </MuiDeselectedPaper>}
            </MuiGrid>

            {selectedNoteId === note.id &&
            <MuiHidden smUp>
                <MuiGrid item>
                    <NoteListItemDetails note={note} />
                </MuiGrid>
            </MuiHidden>}

        </MuiGrid>
    </MuiListItem>
);

NoteListItem.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default NoteListItem;
