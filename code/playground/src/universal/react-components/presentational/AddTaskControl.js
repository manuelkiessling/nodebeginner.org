import React from "react";
import PropTypes from "prop-types";
import MuiButton from "@material-ui/core/Button";
import MuiFormControl from "@material-ui/core/FormControl";
import MuiInputLabel from "@material-ui/core/InputLabel";
import MuiInput from "@material-ui/core/Input";

const AddTaskControl = ({ handleSubmit, handleChange, title }) => (
    <form onSubmit={handleSubmit}>
        <MuiFormControl margin="normal">
            <MuiInputLabel htmlFor="title">Title</MuiInputLabel>
            <MuiInput id="title" value={title} onChange={handleChange} />
        </MuiFormControl>
        <MuiFormControl>
            <MuiButton type="submit" variant="contained" color="primary">
                Add
            </MuiButton>
        </MuiFormControl>
    </form>
);

AddTaskControl.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    title: PropTypes.string
};

export default AddTaskControl;
