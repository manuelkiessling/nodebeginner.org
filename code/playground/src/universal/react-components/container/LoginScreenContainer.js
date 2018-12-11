import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSessionTokenThunk } from "../../redux-actions/thunks";
import LoginScreen from "../presentational/LoginScreen";
import MuiTypography from "@material-ui/core/Typography/Typography";
import { Redirect } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchSessionTokenThunk: (username, password) => dispatch(fetchSessionTokenThunk(username, password))
    };
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        errorMessage: state.ui.errorMessage
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
            <React.Fragment>
                {this.props.isLoggedIn && <Redirect push to="/notes" />}

                {this.props.errorMessage !== "" &&
                <MuiTypography variant="h6" color="error">
                    {this.props.errorMessage}
                </MuiTypography>}

                <LoginScreen handleSubmit={this.handleSubmit} handleChange={this.handleChange} username={username} password={password} />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenContainer);
