import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticleCommand } from "../../actions";

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddArticle: (article) => dispatch(addArticleCommand(article))
    };
};

class ConnectedFormContainer extends Component {
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
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                    SAVE
                </button>
            </form>
        );
    }
}

const FormContainer = connect(null, mapDispatchToProps)(ConnectedFormContainer);

export default FormContainer;
