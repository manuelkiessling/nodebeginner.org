import React from "react";
import PropTypes from "prop-types";
import MuiListItem from "./mui-overrides/ListItem";
import MuiTypography from "@material-ui/core/Typography";
import { NoteEntity } from "../../entities/NoteEntity";

const NoteListItem = ({ note, selectedNote, handleSelectNote }) => (
    <MuiListItem onclick={() => handleSelectNote(note)}>
        <div>
            <div>
                <MuiTypography variant="body1">
                    {note.title}
                </MuiTypography>
            </div>
            <div>
                <MuiTypography variant="caption" color="textSecondary">
                    {note.id}
                </MuiTypography>
            </div>
        </div>
        <div>
            {selectedNote === note &&
            <MuiTypography variant="caption" color="textSecondary">
                {note.lastModified}
            </MuiTypography>
            }
        </div>
    </MuiListItem>
);

NoteListItem.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default NoteListItem;
