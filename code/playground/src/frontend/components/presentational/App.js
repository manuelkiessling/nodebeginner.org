import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import ConnectedListContainer from "../container/ListContainer";
import ConnectedFormContainer from "../container/FormContainer";

const App = ({handleSubmit, debugInfo}) => (
    <React.Fragment>
        <CssBaseline />
        <div>
            <div>
                <h2>Articles</h2>
                <button type="submit" onClick={handleSubmit}>
                    FETCH
                </button>
                <ConnectedListContainer />
                <pre>{JSON.stringify(debugInfo)}</pre>
            </div>
            <div>
                <h2>Add a new article</h2>
                <ConnectedFormContainer />
            </div>
        </div>
    </React.Fragment>
);

export default App;
