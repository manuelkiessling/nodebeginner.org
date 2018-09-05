import React, { Component } from "react";
import { Provider } from "react-redux";
import App from "../presentational/App";
import store from "../../../universal/store";

class AppContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default AppContainer;
