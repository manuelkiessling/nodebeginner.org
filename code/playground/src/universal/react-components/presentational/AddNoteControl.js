import React from "react";
import PropTypes from "prop-types";
import MuiAddIcon from "@material-ui/icons/Add";
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiButton from "@material-ui/core/es/Button/Button";
import MuiHidden from "@material-ui/core/Hidden";

const AddNoteControl = ({ handleSubmit, handleChange, title }) => (
    <MuiGrid container direction="row" spacing={24} justify="flex-start" alignItems="center">
        <MuiGrid item xs={8} md={8} lg={10} xl={11}>
            <MuiTextField id="title" label="New note title" variant="outlined" value={title} onChange={handleChange} fullWidth />
        </MuiGrid>
        <MuiGrid item xs={4} md={4} lg={2} xl={1}>
            <MuiButton color="secondary" variant="contained" aria-label="Add" onClick={handleSubmit}>
                <MuiHidden xsDown>
                    Add new note
                </MuiHidden>
                <MuiHidden smUp>
                    <MuiAddIcon />
                </MuiHidden>
            </MuiButton>
        </MuiGrid>
    </MuiGrid>
);

AddNoteControl.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    title: PropTypes.string
};

export default AddNoteControl;
