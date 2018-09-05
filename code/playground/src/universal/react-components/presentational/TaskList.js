import React from "react";
import MuiList from "@material-ui/core/List";
import TaskListItem from "./TaskListItem";
import MuiPaper from "./mui-overrides/Paper";

const TaskList = ({ tasks }) => (
    <MuiPaper>
        <MuiList>
            {tasks.map(tasks => (
                <TaskListItem key={tasks.id} task={tasks} />
            ))}
        </MuiList>
    </MuiPaper>
);

export default TaskList;
