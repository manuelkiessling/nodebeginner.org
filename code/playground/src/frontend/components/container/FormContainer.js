import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticleCommand } from "../../actions/commands";
import Form from "../presentational/Form"

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddArticle: (article) => dispatch(addArticleCommand(article))
    };
};

class FormContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        const id = uuidv1();
        this.props.dispatchAddArticle({ title, id });
        this.setState({ title: "" });
    }

    render() {
        const { title } = this.state;
        return (
            <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange} title={title}/>
        );
    }
}

const ConnectedFormContainer = connect(null, mapDispatchToProps)(FormContainer);

export default ConnectedFormContainer;
