import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import AddTaskControl from "../presentational/AddTaskControl"
import Task from "../../models/Task";
import { addTaskThunk } from "../../redux-actions/thunks";

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddTask: (task) => dispatch(addTaskThunk(task))
    };
};

class AddTaskControlContainer extends Component {
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
        const id = uuidv1();
        this.props.dispatchAddTask(new Task(title, id, Date.now()));
        this.setState({ title: "" });
    }

    render() {
        const { title } = this.state;
        return (
            <AddTaskControl handleSubmit={this.handleSubmit} handleChange={this.handleChange} title={title} />
        );
    }
}

export default connect(null, mapDispatchToProps)(AddTaskControlContainer);
