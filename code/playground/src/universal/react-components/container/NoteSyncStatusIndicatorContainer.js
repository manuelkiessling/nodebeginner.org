import React, { Component } from "react";
import { connect } from "react-redux";
import NoteSyncStatusIndicator from "../presentational/NoteSyncStatusIndicator";
import { NoteEntity } from "../../entities/NoteEntity";

const mapStateToProps = (state) => {
    return {
        unsyncedNoteEntityEvents: state.entities[NoteEntity.entityName()].unsyncedEvents
    };
};

class NoteSyncStatusIndicatorContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let status = "synced";
        for (let i=0; i < this.props.unsyncedNoteEntityEvents.length; i++) {
            if (this.props.unsyncedNoteEntityEvents[i].entityId === this.props.note.id) {
                status = "not synced";
            }
        }
        return <NoteSyncStatusIndicator status={status} />
    }
}

export default connect(mapStateToProps, null)(NoteSyncStatusIndicatorContainer);
