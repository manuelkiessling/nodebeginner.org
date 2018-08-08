# Setup new Node.js & React Project

- VisualStudio Code
- Node.js 10
- `npm -g update npm`
- https://www.valentinog.com/blog/react-webpack-babel/
- `npm init -y`
- `mkdir src`
- `npm install react webpack webpack-cli --save-dev`

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
      "presets": ["env", "react"]
    }
```

- `npm install react react-dom prop-types --save-dev`

- `mkdir -p src/{backend,frontend}`
- `mkdir -p src/frontend/components/{container,presentational}`

- Babel only for React/JSX, not for Node.js
- Write ES6
- Always `'use strict';`
- https://reactjs.org/docs/typechecking-with-proptypes.html
- nodemon?
- https://medium.com/@learnreact/container-components-c0e67432e005, https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0



    In the simplest terms, the tilde matches the most recent minor version (the middle number). ~1.2.3 will match all 1.2.x versions but will miss 1.3.0.

    The caret, on the other hand, is more relaxed. It will update you to the most recent major version (the first number). ^1.2.3 will match any 1.x.x release including 1.3.0, but will hold off on 2.0.0.

https://semver.npmjs.com/
  
https://github.com/npm/node-semver#tilde-ranges-123-12-1
