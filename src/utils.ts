import {PodiumClientResource, PodiumClientResponse } from "@podium/client";
import Layout from "@podium/layout";
import { Express } from "express";
import {AppBarMenuMainLayout, Pod} from "./types";
import {LAYOUT_DEBUG, LAYOUT_PATH_NAME} from "./environment";
import { buildLinkElement, buildScriptElement } from "./html-utils";
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

export const getPods = (podsFile: string): AppBarMenuMainLayout => {
  return require(podsFile);
};

export const registerAppBarPod = (pods: AppBarMenuMainLayout, layout: Layout) : PodiumClientResource =>
  layout.client.register({
    name: pods.appbar.name,
    uri: pods.appbar.uri,
  });

export const registerMenuPod = (pods: AppBarMenuMainLayout, layout: Layout) : PodiumClientResource =>
  layout.client.register({
    name: pods.menu.name,
    uri: pods.menu.uri,
  });

export const registerPods = (pods: Pod[], appBar: PodiumClientResource, menu: PodiumClientResource,  layout: Layout, app: Express) =>
  pods.forEach((pod) => {
    const podMain = layout.client.register({
      name: pod.name,
      uri: pod.uri,
    });

    app.get(pod.path, async (req, res, next) => {
      const incoming = res.locals.podium;
      const [appBarPod, menuPod, main] = await Promise.all([

        appBar.fetch(incoming),
        menu.fetch(incoming),
        podMain.fetch(incoming),
      ]);

      incoming.podlets = [appBarPod, menuPod, main];

      res.podiumSend(bodyTemplate(appBarPod, menuPod, main));
    });
  });

export const createLayout = (layoutName: string) : Layout => {
    const layout = new Layout({
        name: layoutName,
        pathname: LAYOUT_PATH_NAME,
        logger: console,
        context: {
            debug: {
                enabled: LAYOUT_DEBUG,
            },
        },
    });

    layout.view((incoming, content) => createDocument(incoming, content));

    return layout;
}

 const createDocument = (incoming: any, content: string) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="static/layout.css">
            ${incoming.css.map(buildLinkElement).join("\n")}
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
