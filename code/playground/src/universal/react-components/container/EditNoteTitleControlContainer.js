import React, { Component } from "react";
import { connect } from "react-redux";
import EditNoteControl from "../presentational/EditNoteTitleControl"
import { updateNoteCommand } from "../../redux-actions/commands"

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpdateNote: (noteId, noteTitle) => dispatch(updateNoteCommand(noteId, noteTitle))
    };
};

class EditNoteTitleControlContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.note.title
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        this.props.dispatchUpdateNote(this.props.note.id, title);
    }

    render() {
        const { title } = this.state;
        return (
            <EditNoteControl handleSubmit={this.handleSubmit} handleChange={this.handleChange} title={title} />
        );
    }
}

export default connect(null, mapDispatchToProps)(EditNoteTitleControlContainer);
