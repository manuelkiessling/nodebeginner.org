import { connect } from "react-redux";
import TaskList from "../presentational/TaskList"

const mapStateToProps = (state) => {
    return {
        articles: state.articles
    };
};

export default connect(mapStateToProps, null)(TaskList);
