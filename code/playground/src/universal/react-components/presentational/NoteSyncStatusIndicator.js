import React from "react";
import MuiCloudUploadIcon from "@material-ui/icons/CloudUpload";
import MuiCloudDoneIcon from "@material-ui/icons/CloudDone";

export default ({isSynced}) => (
    <span>
        {isSynced
        &&
            <MuiCloudDoneIcon/>
        ||
            <MuiCloudUploadIcon/>
        }
    </span>
);
