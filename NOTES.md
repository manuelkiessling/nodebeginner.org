# Setup new Node.js & React Project

- VisualStudio Code
- Node.js 10
- `npm -g update npm`
- https://www.valentinog.com/blog/react-webpack-babel/
- https://www.valentinog.com/blog/react-redux-tutorial-beginners/
- `npm init -y`
- `mkdir src`
- `npm install react webpack webpack-cli babel-plugin-transform-object-rest-spread html-webpack-plugin html-loader --save-dev`

webpack.config.js:
```
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }
    };
```

package.json:
```
    "scripts": {
      "build": "webpack --mode production"
    }
```

- `npm install babel-loader babel-core babel-preset-env babel-preset-react --save-dev`

.babelrc:
```
    {
      "presets": ["env", "react"],
      "plugins": ["transform-object-rest-spread"]
    }
```

- `npm install react react-dom prop-types --save-dev`

- `mkdir -p src/{backend,frontend}`
- `mkdir -p src/frontend/components/{container,presentational}`

- `npm install redux react-redux redux-thunk uuid --save-dev`


- Redux Actions are either simple and serializable objects, or functions
- Redux action creators create either event actions (type object), command actions (type object), or thunk actions (type function)
- Event action creators are past tense ("succededFetchNotes")
- Command and thunk action creators are present tense ("addNote")
- Commands and events are synchronous, while thunks are asynchronous and can have side effects like API calls, and dispatch other actions

App state semantics can be either "atomic" or "expressive". Atomic e.g. means that a thunk which fetches notes then atomically dispatches the actions that change the state step-by-step, in form of commands:
- dispatch(stopFetchSpinner)
- dispatch(addNotes)

If using the expressive approach, thunks dispatch only one action instead of multiple steps, of type event, e.g. "succeededFetchNotes", and the reducer then changes the state all at one (stop the spinner, add the notes etc.)
Boils down to personal taste, but I like the expressive approach better.

Action names: `<COMMAND|EVENT>_<ENTITY[S]>_<OPERATION>[_<EVENTNAME>]` -> `COMMAND_NOTE_ADD`, `EVENT_NOTES_FETCHING_SUCCEEDED`
Action creator names: `[<eventname>]<operation|Operation><Entity><Command|Event|Thunk>` -> `addNoteCommand`, `startedFetchingEntityEventsEvent`, `fetchNotesThunk`



- Babel only for React/JSX, not for Node.js
- Write ES6
- ', not "
- Always `'use strict';`
- https://reactjs.org/docs/typechecking-with-proptypes.html
- nodemon?
- https://medium.com/@learnreact/container-components-c0e67432e005, https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- https://facebook.github.io/react/docs/thinking-in-react.html
- `npm update --dev`
- `npm install --no-save` -> avoids "optional: true" changes in package-lock.json

    In the simplest terms, the tilde matches the most recent minor version (the middle number). ~1.2.3 will match all 1.2.x versions but will miss 1.3.0.

    The caret, on the other hand, is more relaxed. It will update you to the most recent major version (the first number). ^1.2.3 will match any 1.x.x release including 1.3.0, but will hold off on 2.0.0.

https://semver.npmjs.com/
  
https://github.com/npm/node-semver#tilde-ranges-123-12-1


Only reducers change the store, by dispatching actions. Actions can be dispatched from two places: React Components or Thunks. Thunks can be dispatched by React Components, intervals, other thunks.

Action creators never dispatch thunks, reducers never dispatch thunks. 

Regularly dispatch an action ir 

mapStateToProps -> maps (part of) the Redux store state to the props of a presentational React component.


Presentational components should always be functional, not class-based: https://reactjs.org/blog/2015/10/07/react-v0.14.html#stateless-functional-components

Component semantics:
- Every component is either a container (in this case it ends with `Container`), or it is a presentational (no special ending)
- All components are one of: Screen (represents one routable location that makes up the main view of the client), List, Item, Control (any form or form-element which the user can interact with to change the state), Modal - the only exception is `App`.


https://reactjs.org/docs/handling-events.html
Generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method.

https://github.com/combine/universal-react-redux/blob/master/server/renderer/handler.js#L110


The React app server part is used to server-side render the initial view of a given React route, and it *can* also serve the backend API, but it doesn't have to - it is sufficient if it resolves data for the initial state during SSR, by requesting the API, even if the API is provided by another service. This way, the app server part is only occupied with delivering the client-side of the app via SSR, and nothing else.
