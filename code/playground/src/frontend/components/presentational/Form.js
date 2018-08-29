import React from "react";

const Form = ({ handleSubmit, handleChange, title }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={handleChange}
            />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
            SAVE
        </button>
    </form>
);

export default Form;
