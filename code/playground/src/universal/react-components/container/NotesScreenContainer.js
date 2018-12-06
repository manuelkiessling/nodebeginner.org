import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEntityEventsThunk, syncEntityEventsThunk } from "../../redux-actions/thunks";
import NotesScreen from "../presentational/NotesScreen";
import { NoteEntity } from "../../entities/NoteEntity";

const mapStateToProps = (state) => {
    return {
        notes: state.entities[NoteEntity.entityName()].calculatedEntities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchEntityEvents: () => dispatch(fetchEntityEventsThunk()),
        dispatchSyncEntityEvents: () => dispatch(syncEntityEventsThunk())
    };
};

class NotesScreenContainer extends Component {
    componentWillMount() {
        console.debug("Dispatching fetchEntityEventsThunk on NotesScreenContainer componentWillMount.");
        this.props.dispatchFetchEntityEvents();
        window.setInterval(() => {
            console.debug("Dispatching syncEntityEventsThunk on NotesScreenContainer componentWillMount.");
            this.props.dispatchSyncEntityEvents();
        }, 5000);
    }

    render() {
        return <NotesScreen />;
    }
}

NotesScreenContainer.ssrDispatchHook = fetchEntityEventsThunk;

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreenContainer);
