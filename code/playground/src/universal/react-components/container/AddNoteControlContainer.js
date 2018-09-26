import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv4 from "uuid";
import AddNoteControl from "../presentational/AddNoteControl"
import { addNoteCommand } from "../../redux-actions/commands"

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddNote: (noteTitle) => dispatch(addNoteCommand(noteTitle))
    };
};

class AddNoteControlContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
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
        const id = uuidv4();
        this.props.dispatchAddNote(title);
        this.setState({ title: "" });
    }

    render() {
        const { title } = this.state;
        return (
            <AddNoteControl handleSubmit={this.handleSubmit} handleChange={this.handleChange} title={title} />
        );
    }
}

export default connect(null, mapDispatchToProps)(AddNoteControlContainer);
