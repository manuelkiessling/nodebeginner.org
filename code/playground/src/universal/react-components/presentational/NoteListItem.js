import React from "react";
import PropTypes from "prop-types";
import MuiListItem from "./mui-overrides/ListItem";
import MuiTypography from "@material-ui/core/Typography";
import { NoteEntity } from "../../entities/NoteEntity";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiHidden from "@material-ui/core/Hidden/Hidden";
import NoteListItemDetails from "./NoteListItemDetails";
import MuiPaper from "@material-ui/core/es/Paper/Paper";

const NoteListItem = ({ note, selectedNoteId, handleSelectNote }) => (
    <MuiListItem onClick={() => handleSelectNote(note)}>
        <MuiGrid container direction="column">
            <MuiGrid item>
                {selectedNoteId === note.id &&
                <MuiPaper>
                    <MuiTypography variant="h6" color="textPrimary">
                        {note.title}
                    </MuiTypography>
                </MuiPaper> ||
                <MuiTypography variant="h6" color="textSecondary">
                    {note.title}
                </MuiTypography>
                }

            </MuiGrid>
            <MuiGrid item>
                <MuiTypography variant="caption" color={selectedNoteId === note.id && "textPrimary" || "textSecondary"}>
                    {note.id}
                </MuiTypography>
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
