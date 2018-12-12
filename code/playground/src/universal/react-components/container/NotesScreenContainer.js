import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEntityEventsThunk } from "../../redux-actions/thunks";
import NotesScreen from "../presentational/NotesScreen";
import { NoteEntity } from "../../entities/NoteEntity";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
    const isLoggedIn = state.session.isLoggedIn;
    const userId = state.session.userId;
    let notes = [];

    if (isLoggedIn && userId != null && state.entities.hasOwnProperty(userId)) {
        notes = state.entities[userId][NoteEntity.entityName()].calculatedEntities;
    }

    console.log(`Notes in NotesScreenContainer is ${JSON.stringify(notes, null, 4)}.`); // TODO: Why is this undefined during SSR?

    return {
        isLoggedIn: isLoggedIn,
        userId: userId,
        notes: notes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchEntityEvents: (userId) => dispatch(fetchEntityEventsThunk(userId))
    };
};

class NotesScreenContainer extends Component {
    componentWillMount() {
        if (this.props.isLoggedIn) {
            console.debug(`Dispatching fetchEntityEventsThunk on NotesScreenContainer componentWillMount for userId ${this.props.userId}.`);
            this.props.dispatchFetchEntityEvents(this.props.userId);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <NotesScreen /> || <Redirect push to="/" />}
            </React.Fragment>
        );
    }
}

NotesScreenContainer.ssrDispatchHook = (userId, sessionToken) => {
    if (userId != null && sessionToken != null) {
        return fetchEntityEventsThunk(userId, sessionToken);
    } else {
        return () => {};
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreenContainer);
