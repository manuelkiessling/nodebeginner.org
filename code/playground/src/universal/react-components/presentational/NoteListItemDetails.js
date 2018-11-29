import React from "react";
import PropTypes from "prop-types";
import MuiTypography from "@material-ui/core/Typography";
import { NoteEntity } from "../../entities/NoteEntity";

const NoteListItemDetails = ({ note }) => (
    <MuiTypography variant="caption" color="textSecondary">
        {note.id}
        -
        {note.title}
        -
        {note.lastModified}
    </MuiTypography>
);

NoteListItemDetails.propTypes = {
    note: PropTypes.instanceOf(NoteEntity)
};

export default NoteListItemDetails;
