import React from "react";
import PropTypes from "prop-types";
import MuiCheckIcon from "@material-ui/icons/Check";
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
    }
});

const EditNoteTitleControl = ({ handleClickTitle, handleChange, handleSubmit, title, inEditMode, titleHasBeenChanged, classes }) => (
    <div>
        {inEditMode
        &&
        <form onSubmit={handleSubmit}>

            <MuiGrid container direction="row" spacing={24} justify="flex-start" alignItems="center">
                <MuiGrid item xs container className={classes.textFieldGridItem}>
                    <MuiTextField autoFocus id="title" label="Change note title" variant="outlined" value={title} onChange={handleChange} fullWidth/>
                </MuiGrid>
                <MuiGrid item className={classes.buttonGridItem}>
                    <MuiButton color="secondary" variant="contained" disabled={!titleHasBeenChanged}  aria-label="Save" onClick={handleSubmit}>
                        <MuiHidden smDown>
                            Save new title
                        </MuiHidden>
                        <MuiHidden mdUp>
                            <MuiCheckIcon/>
                        </MuiHidden>
                    </MuiButton>
                </MuiGrid>
            </MuiGrid>
        </form>
        ||
        <MuiTypography variant="h6" onClick={handleClickTitle}>
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
