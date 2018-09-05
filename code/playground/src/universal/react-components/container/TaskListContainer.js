import React, { Component } from "react";
import { connect } from "react-redux";
import TaskList from "../presentational/TaskList"

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    };
};

class TaskListContainer extends Component {
    render() {
        return <TaskList tasks={this.props.tasks} />;
    }
}

export default connect(mapStateToProps, null)(TaskListContainer);
