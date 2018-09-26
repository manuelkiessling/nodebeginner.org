import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEntityEventsThunk } from "../../redux-actions/thunks";
import NotesScreen from "../presentational/NotesScreen";
import { NoteEntity } from "../../entities/NoteEntity";

const mapStateToProps = (state) => {
    return {
        notes: state.entities[NoteEntity.entityName()].calculatedEntities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchEntityEvents: () => dispatch(fetchEntityEventsThunk())
    };
};

class NotesScreenContainer extends Component {
    componentWillMount() {
        console.debug("Dispatching fetchEntityEventsThunk on NotesScreenContainer componentWillMount.");
        this.props.dispatchFetchEntityEvents();
    }

    render() {
        return <NotesScreen />;
    }
}

NotesScreenContainer.ssrDispatchHook = fetchEntityEventsThunk;

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreenContainer);
