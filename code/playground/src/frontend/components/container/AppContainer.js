import React, { Component } from "react";
import { connect } from "react-redux";
import ConnectedListContainer from "./ListContainer";
import ConnectedFormContainer from "./FormContainer";
import { fetchArticlesThunk } from "../../actions/thunks"

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
        return (
            <div className="row mt-5">
                <div className="col-md-4 offset-md-1">
                    <h2>Articles</h2>
                    <button type="submit" className="btn btn-success btn-lg" onClick={this.props.dispatchFetchArticles}>
                        FETCH
                    </button>
                    <ConnectedListContainer />
                    <pre>{JSON.stringify(this.props.debugInfo)}</pre>
                </div>
                <div className="col-md-4 offset-md-1">
                    <h2>Add a new article</h2>
                    <ConnectedFormContainer />
                </div>
            </div>
        );
    }
}

const ConnectedAppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

export default ConnectedAppContainer;
