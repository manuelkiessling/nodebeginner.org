import React from "react";
import Button from "@material-ui/core/Button";

const Form = ({ handleSubmit, handleChange, title }) => (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title</label>
            <input
                type="text"
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
