import React from "react";
import PropTypes from "prop-types";
import MuiListItem from "./mui-overrides/ListItem";
import MuiTypography from "@material-ui/core/Typography";
import { NoteEntity } from "../../entities/NoteEntity";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiHidden from "@material-ui/core/Hidden/Hidden";
import NoteListItemDetails from "./NoteListItemDetails";
import MuiPaper from "./mui-overrides/Paper";

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
                <MuiPaper>
                    <NoteListItemSummary note={note} selectedNoteId={selectedNoteId} />
                </MuiPaper> ||
                <NoteListItemSummary note={note} selectedNoteId={selectedNoteId} />}

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
