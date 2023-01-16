import { PodiumClientResponse } from "@podium/client";
import Layout from "@podium/layout";
import { Express } from "express";
import {Pods} from "./types";
import type from "@podium/utils";
import {LAYOUT_DEBUG, LAYOUT_PATH_NAME} from "./environment";

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

export const getPods = (podsFile: string): Pods => {
  return require(podsFile);
};

const registerAppBarPod = (pods: Pods, layout: Layout) =>
  layout.client.register({
    name: pods.appbar.name,
    uri: pods.appbar.uri,
  });

const registerMenuPod = (pods: Pods, layout: Layout) =>
  layout.client.register({
    name: pods.menu.name,
    uri: pods.menu.uri,
  });

export const registerPods = (pods: Pods, layout: Layout, app: Express) =>
  pods.main.forEach((pod) => {
    const podMain = layout.client.register({
      name: pod.name,
      uri: pod.uri,
    });

    app.get(pod.uri, async (req, res, next) => {
      const incoming = res.locals.podium;
      const [appbar, menu, main] = await Promise.all([
        registerAppBarPod(pods, layout).fetch(incoming),
        registerMenuPod(pods, layout).fetch(incoming),
        podMain.fetch(incoming),
      ]);

      incoming.podlets = [appbar, menu, main];

      res.podiumSend(bodyTemplate(appbar, menu, main));
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
            ${incoming.css.map(type.buildLinkElement).join("\n")}
            <title>${incoming.view.title}</title>
        </head>
        <body>
            ${content}
            ${incoming.js.map(type.buildScriptElement).join("\n")}
        </body>
    </html>`;
};
