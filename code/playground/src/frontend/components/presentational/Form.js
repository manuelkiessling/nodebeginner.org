import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const Form = ({ handleSubmit, handleChange, title }) => (
    <form onSubmit={handleSubmit}>
        <div>
            <FormControl margin={"normal"}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input id="title" value={title} onChange={handleChange} />
            </FormControl>
        </div>
        <div>
            <FormControl>
                <Button type="submit" variant="contained" color="primary">
                    SAVE
                </Button>
            </FormControl>
        </div>
    </form>
);

export default Form;
