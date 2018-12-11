import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSessionTokenThunk } from "../../redux-actions/thunks";
import LoginScreen from "../presentational/LoginScreen";

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchSessionTokenThunk: (username, password) => dispatch(fetchSessionTokenThunk(username, password))
    };
};

class LoginScreenContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        this.props.dispatchFetchSessionTokenThunk(username, password);
    }

    render() {
        const { username, password } = this.state;
        return (
            <LoginScreen handleSubmit={this.handleSubmit} handleChange={this.handleChange} username={username} password={password} />
        );
    }
}

export default connect(null, mapDispatchToProps)(LoginScreenContainer);
