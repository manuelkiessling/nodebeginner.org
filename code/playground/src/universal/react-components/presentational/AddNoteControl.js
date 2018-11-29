import React from "react";
import PropTypes from "prop-types";
import MuiButton from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from "@material-ui/core/Grid/Grid";

const AddNoteControl = ({ handleSubmit, handleChange, title }) => (
    <form onSubmit={handleSubmit}>
        <MuiGrid container direction="row" spacing={24} justify="flex-start" alignItems="center">
            <MuiGrid item xs={10}>
                <MuiTextField id="title" label="New note title" variant="outlined" value={title} onChange={handleChange} fullWidth />
            </MuiGrid>
            <MuiGrid item>
                <MuiButton type="submit" variant="contained" color="primary">
                    plus
                </MuiButton>
            </MuiGrid>
        </MuiGrid>
    </form>
);

AddNoteControl.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    title: PropTypes.string
};

export default AddNoteControl;
