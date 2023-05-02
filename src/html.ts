import {PodiumClientResponse} from "@podium/client";
import {buildLinkElement, buildScriptElement} from "./html-utils";

export const bodyTemplate = (
    appbar: PodiumClientResponse | string,
    menu: PodiumClientResponse | string,
    main: PodiumClientResponse | string
) => {
    return `
    <div class="grid-container">
        <div class="grid-header">
            ${appbar}
        </div>
        <div class="grid-menu">
            ${menu}
        </div>
        <div class="grid-main">
            ${main}
        </div>
     </div>
    `;
};

export const createDocument = (incoming: any, content: string) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="https://stflaiscdn.blob.core.windows.net/media/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            ${incoming.css.map(buildLinkElement).join("\n")}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <link 
                rel="stylesheet" 
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" 
            />


            <title>${incoming.view.title}</title>
            <style>
                body {
                    margin: 0;
                }

                .grid-container {
                    display: grid;
                    grid-template-areas:
                            'header header header header '
                            'menu main main main ';
                    grid-template-rows: auto 100vh;
                    grid-template-columns: 240px 1fr 1fr 1fr;
                }

                .grid-header {
                    z-index: 1250;
                    grid-area: header;
                }
                
                .grid-menu {
                    grid-area: menu;
                }
                
                .grid-main {
                    grid-area: main;
                    margin: 32px;
                }
                
                .main {
                    height: 100vh;
                }
            </style>
        </head>
        <body>
            ${content}
            ${incoming.js.map(buildScriptElement).join("\n")}
        </body>
    </html>`;
};
