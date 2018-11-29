import React, { Component } from "react";
import { connect } from "react-redux";
import NoteList from "../presentational/NoteList"
import { NoteEntity } from "../../entities/NoteEntity";
import { showNoteCommand } from "../../redux-actions/commands";

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSelectNote: (note) => dispatch(showNoteCommand(note))
    };
};

const mapStateToProps = (state) => {
    return {
        notes: state.entities[NoteEntity.entityName()].calculatedEntities,
        selectedNote: state.ui.selectedNote
    };
};

class NoteListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSelectNote = this.handleSelectNote.bind(this);
    }

    handleSelectNote(note) {

    }

    render() {
        return <NoteList notes={this.props.notes} selectedNote={this.props.selectedNote} />;
    }
}

export default connect(mapStateToProps, null)(NoteListContainer);
