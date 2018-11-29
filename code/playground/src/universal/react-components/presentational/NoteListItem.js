import React from "react";
import PropTypes from "prop-types";
import MuiListItem from "./mui-overrides/ListItem";
import MuiTypography from "@material-ui/core/Typography";
import { NoteEntity } from "../../entities/NoteEntity";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiHidden from "@material-ui/core/Hidden/Hidden";
import NoteListItemDetails from "./NoteListItemDetails";

const NoteListItem = ({ note, selectedNote, handleSelectNote }) => (
    <MuiListItem onClick={() => handleSelectNote(note)}>
        <MuiGrid container direction="column">
            <MuiGrid item>
                <MuiTypography variant={selectedNote === note && "h4" || "h5"} color={selectedNote === note && "textPrimary" || "textSecondary"}>
                    {note.title}
                </MuiTypography>
            </MuiGrid>
            <MuiGrid item>
                <MuiTypography variant="caption" color={selectedNote === note && "textPrimary" || "textSecondary"}>
                    {note.id}
                </MuiTypography>
            </MuiGrid>
            {selectedNote === note &&
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
