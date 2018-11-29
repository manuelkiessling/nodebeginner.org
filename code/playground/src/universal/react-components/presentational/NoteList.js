import React from "react";
import PropTypes from "prop-types";
import MuiList from "@material-ui/core/List";
import NoteListItem from "./NoteListItem";
import MuiPaper from "./mui-overrides/Paper";
import { NoteEntity } from "../../entities/NoteEntity";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiTypography from "@material-ui/core/Typography/Typography";
import MuiHidden from "@material-ui/core/Hidden/Hidden";
import NoteListItemDetails from "./NoteListItemDetails";

const NoteList = ({ notes, selectedNote, handleSelectNote }) => (
    <MuiGrid container direction="row">
        <MuiGrid item>
            <MuiList>
                {notes.map(note => (
                    <NoteListItem key={note.id} note={note} selectedNote={selectedNote} handleSelectNote={handleSelectNote} />
                ))}
            </MuiList>
        </MuiGrid>
        {selectedNote != null &&
        <MuiHidden xsDown>
            <MuiGrid item>
                <NoteListItemDetails note={selectedNote} />
            </MuiGrid>
        </MuiHidden>}
    </MuiGrid>
);

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.instanceOf(NoteEntity))
};

export default NoteList;
