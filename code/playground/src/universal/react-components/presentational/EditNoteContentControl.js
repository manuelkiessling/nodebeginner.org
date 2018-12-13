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
    },
    contentArea: {
        minHeight: theme.spacing.unit * 10,
    },
    contentText: {
        backgroundColor: theme.palette.grey[100],
        padding: theme.spacing.unit * 2,
        borderRadius: theme.spacing.unit * 1,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all"
    }
});

const EditNoteContentControl = ({ handleClickContent: handleClick, handleChange, handleAbort, handleSubmit, content, inEditMode, contentHasBeenChanged, classes }) => (
    <div>
        {inEditMode
        &&
            <form onSubmit={handleSubmit}>

                <MuiGrid container direction="row" spacing={24} justify="flex-start" alignItems="flex-start">
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
            <div className={classes.contentArea} onClick={handleClick}>
                {content === ""
                &&
                    <MuiButton color="primary" variant="contained" aria-label="Save new content">
                        <MuiEditIcon/>
                    </MuiButton>
                ||
                <MuiTypography className={classes.contentText} variant="body1">
                    {content}
                </MuiTypography>
                }
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
