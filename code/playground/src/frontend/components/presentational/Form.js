import React from "react";
import Button from "@material-ui/core/Button";

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
        <Button type="submit" variant="contained" color="primary">
            SAVE
        </Button>
    </form>
);

export default Form;
