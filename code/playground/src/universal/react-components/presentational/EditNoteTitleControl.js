import React from "react";
import PropTypes from "prop-types";
import MuiCheckIcon from "@material-ui/icons/Check";
import MuiCloseIcon from "@material-ui/icons/Close";
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiButton from "@material-ui/core/es/Button/Button";
import MuiHidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import MuiTypography from "@material-ui/core/Typography/Typography";

const styles = (theme) => ({
    root: {},
    textFieldGridItem: {},
    buttonGridItem: {
        marginRight: theme.spacing.unit * 2
    },
    abortButton: {
        marginLeft: theme.spacing.unit * 1
    },
    title: {
        wordBreak: "break-all"
    }
});

const EditNoteTitleControl = ({ handleClickTitle, handleChange, handleAbort, handleSubmit, title, inEditMode, titleHasBeenChanged, classes }) => (
    <div>
        {inEditMode
        &&
        <form onSubmit={handleSubmit}>

            <MuiGrid container direction="row" spacing={24} justify="flex-start" alignItems="center">
                <MuiGrid item md container className={classes.textFieldGridItem}>
                    <MuiTextField autoFocus id="title" label="Change note title" variant="outlined" value={title} onChange={handleChange} fullWidth/>
                </MuiGrid>
                <MuiGrid item className={classes.buttonGridItem}>
                    <MuiButton color="primary" variant="contained" disabled={!titleHasBeenChanged} aria-label="Save new title" onClick={handleSubmit}>
                        <MuiCheckIcon/>
                    </MuiButton>
                    <MuiButton className={classes.abortButton} color="secondary" variant="contained" aria-label="Save" onClick={handleAbort}>
                        <MuiCloseIcon/>
                    </MuiButton>
                </MuiGrid>
            </MuiGrid>
        </form>
        ||
        <MuiTypography variant="h5" className={classes.title} onClick={handleClickTitle}>
            {title}
        </MuiTypography>
        }
    </div>
);

EditNoteTitleControl.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    title: PropTypes.string
};

export default withStyles(styles)(EditNoteTitleControl);
