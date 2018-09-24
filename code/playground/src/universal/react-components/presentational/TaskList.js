import React from "react";
import PropTypes from "prop-types";
import MuiList from "@material-ui/core/List";
import TaskListItem from "./TaskListItem";
import MuiPaper from "./mui-overrides/Paper";
import { TaskEntity } from "../../entities/TaskEntity";

const TaskList = ({ tasks }) => (
    <MuiPaper>
        <MuiList>
            {tasks.map(task => (
                <TaskListItem key={task.id} task={task} />
            ))}
        </MuiList>
    </MuiPaper>
);

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.instanceOf(TaskEntity))
};

export default TaskList;
