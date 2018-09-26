import React from "react";
import PropTypes from "prop-types";
import MuiListItem from "@material-ui/core/ListItem";
import MuiTypography from "@material-ui/core/Typography";
import { NoteEntity } from "../../entities/NoteEntity";

const NoteListItem = ({ note }) => (
    <MuiListItem>
        <MuiTypography variant="body1">
            {note.id}: {note.title}
        </MuiTypography>
    </MuiListItem>
);

NoteListItem.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default NoteListItem;
