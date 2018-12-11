import clientAssetsManifest from "../../dist/client-assets-manifest.json";

const extractAssets = (assets, chunks, ending) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace(ending, "")) > -1)
    .map(k => assets[k]);


const javascriptChunks = extractAssets(clientAssetsManifest, ["main"], ".js")
    .map(c => `<script type="text/javascript" src="/${c}"></script>`);


const cssChunks = extractAssets(clientAssetsManifest, ["main"], ".css")
    .map(c => `<link rel="stylesheet" href="/${c}" />`);


export default (templateContent, reactDom, store, inlineStyle) => {
    return (
        templateContent
            // write the rendered React app DOM
            .replace('<div id="app"></div>', reactDom ? `<div id="app">${reactDom}</div>` : '<div id="app"></div>')

            // write the Redux store state
            .replace("<!-- window.SSR_REDUX_STORE_STATE placeholder -->", store ? `<script>window.SSR_REDUX_STORE_STATE = ${ JSON.stringify(store.getState()) }</script>` : "")

            // write the React JS app script tag(s)
            .replace("<!-- SSR <script> placeholder -->", javascriptChunks.join(""))

            // write the style link tag(s)
            .replace("<!-- SSR style link tag placeholder -->", cssChunks.join(""))

            // write the inline style tag
            .replace("<!-- SSR inline style tag placeholder -->", inlineStyle ? `<style id="ssr-inline-style">${ inlineStyle }</style>` : "")
    );
};
