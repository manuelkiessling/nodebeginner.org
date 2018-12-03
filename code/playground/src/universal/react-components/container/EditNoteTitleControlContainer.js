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
            inEditMode: false,
            title: this.props.note.title
        };
        this.handleClickTitle = this.handleClickTitle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClickTitle(event) {
        this.setState({ inEditMode: true });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        this.setState({ inEditMode: false });
        this.props.dispatchUpdateNote(this.props.note.id, title);
    }

    render() {
        const { title, inEditMode } = this.state;
        let titleHasBeenChanged = false;
        if (title !== this.props.note.title) {
            titleHasBeenChanged = true;
        }
        return (
            <EditNoteControl
                handleClickTitle={this.handleClickTitle}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                title={title}
                inEditMode={inEditMode}
                titleHasBeenChanged={titleHasBeenChanged}
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(EditNoteTitleControlContainer);
