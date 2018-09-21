import React from "react";
import PropTypes from "prop-types";
import MuiListItem from "@material-ui/core/ListItem";
import MuiTypography from "@material-ui/core/Typography";
import { Task } from "../../entities/Task";

const TaskListItem = ({ task }) => (
    <MuiListItem>
        <MuiTypography variant="body1">
            {task.id}: {task.title}
        </MuiTypography>
    </MuiListItem>
);

TaskListItem.propTypes = {
    task: PropTypes.instanceOf(Task)
};

export default TaskListItem;
