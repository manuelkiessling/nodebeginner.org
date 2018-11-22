# The Node Beginner Book

"Notes" - a playground React/Redux app.


## Project architecture

### Primary components

* Universal React/Redux application, in `src/universal/`

* Client-side application initializer, in `src/client/`

* HTTP server for Server-Side Rendering & API endpoints, in `src/server/`


## Running the project

In order to provide a working application to the end user, three runtime components are required: a build of the React/Redux application, a build of the SSR server application, and, for now, a mock API server application.


### Locally

#### Full setup (with SSR, with Mock API, with client-side app)

    npm install
    npm run build:dev:*
    npm run start:dev:mock-api-server
    npm run start:dev:ssr-server


#### Client-only (w/o SSR, with Mock API, with client-side app)

    npm install
    npm run start:dev:mock-api-serve
    start:dev:client-webpack-dev-server
