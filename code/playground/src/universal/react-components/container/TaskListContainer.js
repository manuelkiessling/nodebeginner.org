import React, { Component } from "react";
import { connect } from "react-redux";
import TaskList from "../presentational/TaskList"
import { fetchTasksThunk } from "../../redux-actions/thunks";

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchTasks: () => dispatch(fetchTasksThunk())
    };
};

class TaskListContainer extends Component {
    componentWillMount() {
        this.props.dispatchFetchTasks();
    }

    render() {
        return <TaskList tasks={this.props.tasks} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
