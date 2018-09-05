import React, { Component } from "react";
import App from "../presentational/App";

class AppContainer extends Component {

    // Remove the server-side injected inline CSS.
    componentDidMount() {
        const ssrInlineStyles = document.getElementById("ssr-inline-style");
        if (ssrInlineStyles && ssrInlineStyles.parentNode) {
            ssrInlineStyles.parentNode.removeChild(ssrInlineStyles);
        }
    }

    render() {
        return (
            <App />
        );
    }
}

export default AppContainer;
