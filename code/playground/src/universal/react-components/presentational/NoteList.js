import React from "react";
import PropTypes from "prop-types";
import MuiList from "@material-ui/core/List";
import NoteListItem from "./NoteListItem";
import { NoteEntity } from "../../entities/NoteEntity";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiHidden from "@material-ui/core/Hidden/Hidden";
import { withStyles } from "@material-ui/core/styles";
import NoteListItemDetails from "./NoteListItemDetails";
import { noteById } from "../../entities/Helpers";

const styles = (theme) => ({
    root: {},
    smUplist: {
        border: 0,
        paddingTop: 0,
        overflow: "hidden scroll",
        position: "absolute",
        bottom: 0,
        top: "160px",
        width: "30%"
    },
    listGridItem: {
        width: "100%"
    },
    detailsGridItem: {
        border: 0,
        paddingTop: 0,
        overflow: "hidden scroll",
        position: "absolute",
        bottom: 0,
        right: 0,
        top: "160px",
        width: "70%",
        paddingLeft: `${theme.spacing.unit * 1}px`,
    }
});

const NoteList = ({ notes, selectedNoteId, handleSelectNote, classes }) => (
    <div>
        <MuiHidden xsDown implementation="css">
            <MuiGrid container direction="row">
                <MuiGrid item xs={4}>
                    <MuiList className={classes.smUplist}>
                        {notes.map(note => (
                            <NoteListItem key={note.id} note={note} selectedNoteId={selectedNoteId} handleSelectNote={handleSelectNote} />
                        ))}
                    </MuiList>
                </MuiGrid>
                {selectedNoteId != null &&
                    <MuiGrid item xs={8} className={classes.detailsGridItem}>
                        <NoteListItemDetails note={noteById(notes, selectedNoteId)} />
                    </MuiGrid>}
            </MuiGrid>
        </MuiHidden>
        <MuiHidden smUp implementation="css">
            <MuiGrid container direction="row">
                <MuiGrid item className={classes.listGridItem}>
                    <MuiList>
                        {notes.map(note => (
                            <NoteListItem key={note.id} note={note} selectedNoteId={selectedNoteId} handleSelectNote={handleSelectNote} />
                        ))}
                    </MuiList>
                </MuiGrid>
            </MuiGrid>
        </MuiHidden>
    </div>
);

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.instanceOf(NoteEntity))
};

export default withStyles(styles)(NoteList);
