import React from "react";
import MuiCard from "@material-ui/core/Card";
import MuiCardContent from "@material-ui/core/CardContent";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiGrid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import AddNoteControlContainer from "../container/CreateNoteControlContainer";
import NoteListContainer from "../container/NoteListContainer";

const styles = (theme) => ({
    root: {
        paddingTop: theme.spacing.unit * 2
    },
    addNoteControlGridItem: {
        marginBottom: theme.spacing.unit * 5
    },
    noteListContainerGridItem: {}
});

const NotesScreen = ({ classes }) => (
    <MuiCard className={classes.root}>
        <MuiCardHeader title="Your notes" />

        <MuiCardContent>

            <MuiGrid container direction="column">

                <MuiGrid item className={classes.addNoteControlGridItem}>
                    <AddNoteControlContainer/>
                </MuiGrid>

                <MuiGrid item className={classes.noteListContainerGridItem}>
                    <NoteListContainer/>
                </MuiGrid>

            </MuiGrid>

        </MuiCardContent>

    </MuiCard>
);

export default withStyles(styles)(NotesScreen);
