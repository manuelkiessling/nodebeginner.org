import React from "react";
import MuiList from "@material-ui/core/List";
import MuiListItem from '@material-ui/core/ListItem';
import MuiTypography from '@material-ui/core/Typography';

const TaskListItem = ({ task }) => (
    <MuiList>
        {tasks.map(el => (
            <MuiListItem key={el.id}>
                <MuiTypography variant="body1">
                    {el.id}: {el.title}
                </MuiTypography>
            </MuiListItem>
        ))}
    </MuiList>
);

export default TaskList;
