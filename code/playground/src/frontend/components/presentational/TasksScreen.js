import React from "react";
import MuiCard from "@material-ui/core/Card";
import MuiCardContent from "@material-ui/core/CardContent";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiGrid from "@material-ui/core/Grid";
import MuiTypography from "@material-ui/core/Typography";

const TasksScreen = () => (
    <MuiCard>
        <MuiCardHeader title="Your tasks" />

        <MuiCardContent>

            <MuiGrid container direction="column">

                <MuiGrid item>
                    <AddTaskControlContainer/>
                </MuiGrid>

                <MuiGrid item>
                    <TasksListContainer/>
                </MuiGrid>

            </MuiGrid>

        </MuiCardContent>

    </MuiCard>
);
