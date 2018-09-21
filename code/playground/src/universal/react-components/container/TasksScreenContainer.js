import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTasksThunk } from "../../redux-actions/thunks";
import TasksScreen from "../presentational/TasksScreen";

const mapStateToProps = (state) => {
    return {
        tasks: state.entities.tasks.calculatedEntities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchTasks: () => dispatch(fetchTasksThunk())
    };
};

class TasksScreenContainer extends Component {
    componentWillMount() {
        if (this.props.tasks.length <= 0) {
            //this.props.dispatchFetchTasks();
        }
    }

    render() {
        return <TasksScreen />;
    }
}

//TasksScreenContainer.ssrDispatchHook = fetchTasksThunk;

export default connect(mapStateToProps, mapDispatchToProps)(TasksScreenContainer);
