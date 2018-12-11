import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEntityEventsThunk } from "../../redux-actions/thunks";
import NotesScreen from "../presentational/NotesScreen";
import { NoteEntity } from "../../entities/NoteEntity";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
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
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <NotesScreen /> || <Redirect push to="/" />}
            </React.Fragment>
        );
    }
}

NotesScreenContainer.ssrDispatchHook = fetchEntityEventsThunk;

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreenContainer);
