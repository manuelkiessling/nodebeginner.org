import React from "react";
import MuiButton from "@material-ui/core/Button";
import MuiFormControl from "@material-ui/core/FormControl";
import MuiInputLabel from "@material-ui/core/InputLabel";
import MuiInput from "@material-ui/core/Input";

const Form = ({ handleSubmit, handleChange, title }) => (
    <form onSubmit={handleSubmit}>
        <div>
            <MuiFormControl margin={"normal"}>
                <MuiInputLabel htmlFor="title">Title</MuiInputLabel>
                <MuiInput id="title" value={title} onChange={handleChange} />
            </MuiFormControl>
        </div>
        <div>
            <MuiFormControl>
                <MuiButton type="submit" variant="contained" color="primary">
                    SAVE
                </MuiButton>
            </MuiFormControl>
        </div>
    </form>
);

export default Form;
