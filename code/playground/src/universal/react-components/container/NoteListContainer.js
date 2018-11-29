import React, { Component } from "react";
import { connect } from "react-redux";
import NoteList from "../presentational/NoteList"
import { NoteEntity } from "../../entities/NoteEntity";
import { selectNoteCommand } from "../../redux-actions/commands";

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSelectNote: (note) => dispatch(selectNoteCommand(note))
    };
};

const mapStateToProps = (state) => {
    return {
        notes: state.entities[NoteEntity.entityName()].calculatedEntities,
        selectedNoteId: state.ui.selectedNoteId
    };
};

class NoteListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSelectNote = this.handleSelectNote.bind(this);
    }

    handleSelectNote(note) {
        this.props.dispatchSelectNote(note);
    }

    render() {
        return <NoteList notes={this.props.notes} selectedNoteId={this.props.selectedNoteId} handleSelectNote={this.handleSelectNote} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
