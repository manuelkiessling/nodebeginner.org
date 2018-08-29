import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArticlesThunk } from "../../actions/thunks"
import App from "../presentational/App";

const mapStateToProps = (state) => {
    return {
        debugInfo: state.debugInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchArticles: () => dispatch(fetchArticlesThunk())
    };
};

class AppContainer extends Component {
    render() {
        return <App handleSubmit={this.props.dispatchFetchArticles} debugInfo={this.props.debugInfo} />;
    }
}

const ConnectedAppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

export default ConnectedAppContainer;
