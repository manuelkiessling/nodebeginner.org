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

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
