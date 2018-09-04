import React from "react";
import MuiButton from "@material-ui/core/Button";
import MuiFormControl from "@material-ui/core/FormControl";
import MuiInputLabel from "@material-ui/core/InputLabel";
import MuiInput from "@material-ui/core/Input";
import MuiGrid from "@material-ui/core/Grid/Grid";
import MuiCard from "@material-ui/core/Card/Card";
import MuiCardHeader from "@material-ui/core/CardHeader/CardHeader";
import MuiCardContent from "@material-ui/core/CardContent/CardContent";

const Form = ({ handleSubmit, handleChange, title }) => (
    <MuiGrid item md="6">
        <MuiCard>
            <MuiCardHeader
                title="Add a new article"
            />
            <MuiCardContent>
                <form onSubmit={handleSubmit}>
                    <div>
                        <MuiFormControl margin="normal">
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
            </MuiCardContent>
        </MuiCard>
    </MuiGrid>

);

export default Form;
