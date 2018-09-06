import React from "react";
import MuiListItem from "@material-ui/core/ListItem";
import MuiTypography from "@material-ui/core/Typography";

const TaskListItem = ({ task }) => (
    <MuiListItem>
        <MuiTypography variant="body1">
            {task.id}: {task.title}
        </MuiTypography>
    </MuiListItem>
);

export default TaskListItem;
