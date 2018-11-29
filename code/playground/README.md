# The Node Beginner Book

"Notes" - a playground React/Redux app.


## Project architecture

### Primary components

* Universal React/Redux application, in `src/universal/`

* Client-side application initializer, in `src/client/`

* HTTP server for Server-Side Rendering & API endpoints, in `src/server/`


## Running the project

In order to provide a working application to the end user, three runtime components are required: a build of the client-side React/Redux application, a build of the SSR server application, and, for now, a mock API server application.


### Locally

#### Full setup

With SSR, with Mock API, client-side app served from dedicated server process.

    npm install --no-save
    npm run build:dev:*
    npm run start:dev:mock-api-server # in one terminal session
    npm run start:dev:ssr-server      # in another terminal session


#### Client-only

Without SSR, with Mock API, client-side app served from Webpack development server.

    npm install --no-save
    npm run start:dev:mock-api-server
    start:dev:client-webpack-dev-server
