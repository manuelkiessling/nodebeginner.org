import renderHtmlTemplate from "./renderHtmlTemplate";
import fs from "fs";
import path from "path";

const swPrecacheAppshellPath = path.resolve(__dirname, "..", "src", "universal", "html-templates", "sw-precache-appshell.html");

export default (httpServer) => {

    return new Promise((resolve, reject) => {
        fs.readFile(swPrecacheAppshellPath, "utf8", (error, templateContent) => {
            if (error) {
                reject(error);
            } else {
                httpServer.get("/sw-precache-appshell", (req, res) => {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(renderHtmlTemplate(templateContent, false, false, false));

                });
                console.info(`Will serve ${"sw precache appshell".blue} at ${"/sw-precache-appshell".cyan}, from ${swPrecacheAppshellPath.cyan}.`);
                resolve();
            }
        });
    });

}
