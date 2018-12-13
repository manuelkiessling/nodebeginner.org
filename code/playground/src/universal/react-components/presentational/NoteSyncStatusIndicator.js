import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiCloudUploadIcon from "@material-ui/icons/CloudUpload";
import MuiCloudDoneIcon from "@material-ui/icons/CloudDone";

const styles = (theme) => ({
    icon: {
        height: `${theme.spacing.unit * 2}px`,
        verticalAlign: "text-bottom",
    }
});

export default withStyles(styles)(({isSynced, classes}) => (
    <span>
        {isSynced
        &&
            <MuiCloudDoneIcon className={classes.icon} color="action"/>
        ||
            <MuiCloudUploadIcon className={classes.icon} color="disabled"/>
        }
    </span>
));
