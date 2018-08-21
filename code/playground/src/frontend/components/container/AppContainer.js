import React, { Component } from "react";
import { connect } from "react-redux";
import ListContainer from "./ListContainer";
import FormContainer from "./FormContainer";
import { fetchArticlesCommand } from "../../thunks"

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchArticles: () => dispatch(fetchArticlesCommand())
    };
};

class ConnectedAppContainer extends Component {
    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-4 offset-md-1">
                    <h2>Articles</h2>
                    <button type="submit" className="btn btn-success btn-lg" onClick={this.props.dispatchFetchArticles}>
                        FETCH
                    </button>
                    <ListContainer />
                </div>
                <div className="col-md-4 offset-md-1">
                    <h2>Add a new article</h2>
                    <FormContainer />
                </div>
            </div>
        );
    }
}

const AppContainer = connect(null, mapDispatchToProps)(ConnectedAppContainer);

export default AppContainer;
