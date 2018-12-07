import React, { Component } from "react";
import { connect } from "react-redux";
import NoteSyncStatusIndicator from "../presentational/NoteSyncStatusIndicator";
import { NoteEntity } from "../../entities/NoteEntity";

const mapStateToProps = (state) => {
    console.warn("reacting to state change...");
    const unsyncedNoteEntityEvents = [];
    for (let i=0; i < state.entities[NoteEntity.entityName()].unsyncedEvents.length; i++) {
        unsyncedNoteEntityEvents.push(state.entities[NoteEntity.entityName()].unsyncedEvents[i]);
    }
    console.warn(`mapped to props: ${JSON.stringify(unsyncedNoteEntityEvents, null, 4)}`);
    return {
        unsyncedNoteEntityEvents: unsyncedNoteEntityEvents
    }
};

class NoteSyncStatusIndicatorContainer extends Component {
    constructor(props) {
        super(props);

        console.warn(`looks like i'm created anew for ${props.note.id}...`);

        this.state = {
            status: "synced"
        };
        for (let i=0; i < props.unsyncedNoteEntityEvents.length; i++) {
            if (props.unsyncedNoteEntityEvents[i].id === props.note.id) {
                this.state = {
                    status: "not synced"
                };
            }
        }
    }

    render() {
        return <NoteSyncStatusIndicator status={this.state.status} />
    }
}

export default connect(mapStateToProps, null)(NoteSyncStatusIndicatorContainer);
