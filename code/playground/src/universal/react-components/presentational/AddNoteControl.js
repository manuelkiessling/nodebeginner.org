import React from "react";
import PropTypes from "prop-types";
import MuiAddIcon from "@material-ui/icons/Add";
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiButton from "@material-ui/core/es/Button/Button";
import MuiHidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {},
    textFieldGridItem: {},
    buttonGridItem: {}
});

const AddNoteControl = ({ handleSubmit, handleChange, title, classes }) => (
    <form onSubmit={handleSubmit}>

    <MuiGrid container direction="row" spacing={24} justify="flex-start" alignItems="center">
        <MuiGrid item xs container className={classes.textFieldGridItem}>
            <MuiTextField id="title" label="New note title" variant="outlined" value={title} onChange={handleChange} fullWidth />
        </MuiGrid>
        <MuiGrid item className={classes.buttonGridItem}>
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
    </form>

);

AddNoteControl.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    title: PropTypes.string
};

export default withStyles(styles)(AddNoteControl);
