import React from "react";
import MuiCard from "@material-ui/core/Card";
import MuiCardContent from "@material-ui/core/CardContent";
import MuiCardHeader from "@material-ui/core/CardHeader";
import MuiGrid from "@material-ui/core/Grid";
import AddNoteControlContainer from "../container/AddNoteControlContainer";
import NoteListContainer from "../container/NoteListContainer";

const NotesScreen = () => (
    <MuiCard>
        <MuiCardHeader title="Your notes" />

        <MuiCardContent>

            <MuiGrid container direction="column">

                <MuiGrid item>
                    <AddNoteControlContainer/>
                </MuiGrid>

                <MuiGrid item>
                    <NoteListContainer/>
                </MuiGrid>

            </MuiGrid>

        </MuiCardContent>

    </MuiCard>
);

export default NotesScreen;
