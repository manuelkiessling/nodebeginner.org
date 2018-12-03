import React from "react";
import PropTypes from "prop-types";
import MuiCheckIcon from "@material-ui/icons/Check";
import MuiCloseIcon from "@material-ui/icons/Close";
import MuiEditIcon from "@material-ui/icons/Edit";
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiButton from "@material-ui/core/es/Button/Button";
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
    }
});

const EditNoteContentControl = ({ handleClickContent: handleClick, handleChange, handleAbort, handleSubmit, content, inEditMode, contentHasBeenChanged, classes }) => (
    <div>
        {inEditMode
        &&
            <form onSubmit={handleSubmit}>

                <MuiGrid container direction="row" spacing={24} justify="flex-start" alignItems="center">
                    <MuiGrid item md container className={classes.textFieldGridItem}>
                        <MuiTextField multiline autoFocus id="content" label="Change note content" variant="outlined" value={content} onChange={handleChange} fullWidth/>
                    </MuiGrid>
                    <MuiGrid item className={classes.buttonGridItem}>
                        <MuiButton color="primary" variant="contained" disabled={!contentHasBeenChanged} aria-label="Save new content" onClick={handleSubmit}>
                            <MuiCheckIcon/>
                        </MuiButton>
                        <MuiButton className={classes.abortButton} color="secondary" variant="contained" aria-label="Save" onClick={handleAbort}>
                            <MuiCloseIcon/>
                        </MuiButton>
                    </MuiGrid>
                </MuiGrid>
            </form>
        ||
            <div>
                {content === ""
                &&
                    <MuiButton color="primary" variant="contained" aria-label="Save new content" onClick={handleClick}>
                        <MuiEditIcon/>
                    </MuiButton>
                }
                <MuiTypography variant="body1" onClick={handleClick}>
                    {content}
                </MuiTypography>
            </div>
        }
    </div>
);

EditNoteContentControl.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    content: PropTypes.string
};

export default withStyles(styles)(EditNoteContentControl);
