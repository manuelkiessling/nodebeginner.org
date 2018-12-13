import React, { Component } from "react";
import { connect } from "react-redux";
import EditNoteControl from "../presentational/EditNoteContentControl"
import { updateNoteContentCommand } from "../../redux-actions/commands"

const mapStateToProps = (state) => ({
    userId: state.session.userId
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpdateNoteContent: (userId, note, updatedContent) => dispatch(updateNoteContentCommand(userId, note, updatedContent))
    };
};

class EditNoteContentControlContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inEditMode: false,
            content: this.props.note.content
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(event) {
        this.setState({ inEditMode: true });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleAbort(event) {
        this.setState({ content: this.props.note.content, inEditMode: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { content } = this.state;
        this.setState({ inEditMode: false });
        this.props.dispatchUpdateNoteContent(this.props.userId, this.props.note, content);
    }

    render() {
        const { content, inEditMode } = this.state;
        let contentHasBeenChanged = false;
        if (content !== this.props.note.content) {
            contentHasBeenChanged = true;
        }
        return (
            <EditNoteControl
                handleClickContent={this.handleClick}
                handleChange={this.handleChange}
                handleAbort={this.handleAbort}
                handleSubmit={this.handleSubmit}
                content={content}
                inEditMode={inEditMode}
                contentHasBeenChanged={contentHasBeenChanged}
                contrasted={this.props.contrasted}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteContentControlContainer);
