import React from "react";
import ListContainer from "./ListContainer";
import FormContainer from "./FormContainer";

const AppContainer = () => (
    <div className="row mt-5">
        <div className="col-md-4 offset-md-1">
            <h2>Articles</h2>
            <ListContainer />
        </div>
        <div className="col-md-4 offset-md-1">
            <h2>Add a new article</h2>
            <FormContainer />
        </div>
    </div>
);

export default AppContainer;
