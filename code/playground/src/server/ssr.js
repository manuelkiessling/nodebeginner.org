import path from "path";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { matchPath, StaticRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import AppContainer from "../universal/react-components/container/AppContainer";
import { initializeCommand } from "../universal/redux-actions/commands";
import routes from "../universal/routes";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, MuiThemeProvider } from "@material-ui/core/styles";
import muiTheme from "../universal/styling/muiTheme";
import { createStoreFromInitialState } from "../universal/redux-state/store";
import renderHtmlTemplate from "./renderHtmlTemplate";

export default (httpServer) => {

    return new Promise((resolve, reject) => {

        const templateFileName = path.resolve(__dirname, "..", "src", "universal", "html-templates", "index.html");

        fs.readFile(templateFileName, "utf8", (err, templateContent) => {
            if (err) {
                reject(err);
            } else {
                httpServer.get(/^\/(notes|)(\?.*)*$/, (req, res) => {

                    const store = createStoreFromInitialState();
                    store.dispatch(initializeCommand());

                    const ssrDispatchHooks =
                        routes
                            .filter((route) => matchPath(req.url, route))                    // filter matching paths
                            .map((route) => route.component)                                 // map to components
                            .filter((component) => component.ssrDispatchHook)                // filter to components that have a SSR trigger
                            .map((component) => {
                                console.debug("Triggering ssrDispatchHook on " + component.name);
                                return store.dispatch(component.ssrDispatchHook());          // dispatch trigger
                            });

                    Promise.all(ssrDispatchHooks).then(() => {
                        const context = {};

                        const sheetsRegistry = new SheetsRegistry();

                        // Create a sheetsManager instance.
                        const sheetsManager = new Map();

                        // Create a new class name generator.
                        const generateClassName = createGenerateClassName();

                        console.debug("Building JSX");
                        const jsx = (
                            <Provider store={store}>
                                <Router context={context} location={req.url}>
                                    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                                        <MuiThemeProvider theme={muiTheme} sheetsManager={sheetsManager}>
                                            <AppContainer/>
                                        </MuiThemeProvider>
                                    </JssProvider>
                                </Router>
                            </Provider>
                        );

                        console.debug("Starting JSX rendering...");
                        const reactDom = renderToString(jsx);
                        console.debug("Finished JSX rendering.");

                        const style = sheetsRegistry.toString();

                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end(renderHtmlTemplate(templateContent, reactDom, store, style));
                    });
                });

                console.info(`Will serve ${"server-side rendered application".blue} at ${"/".green} and ${"/notes".green}.`);
                resolve();
            }

        });
    });
}
