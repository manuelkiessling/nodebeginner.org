import React from "react";
import MuiList from "@material-ui/core/List";
import TaskListItem from "./TaskListItem";

const TaskList = ({ tasks }) => (
    <MuiList>
        {tasks.map(tasks => (
            <TaskListItem key={tasks.id} task={tasks} />
        ))}
    </MuiList>
);

export default TaskList;
