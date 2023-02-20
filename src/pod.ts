import {AppBarMenuMainLayout, Pod} from "./types";
import Layout from "@podium/layout";
import {PodiumClientResource} from "@podium/client";
import {Express} from "express";
import {bodyTemplate} from "./html";

export const getPods = (podsFile: string): AppBarMenuMainLayout => {
    return require(podsFile);
};
export const registerAppBarPod = (pods: AppBarMenuMainLayout, layout: Layout): PodiumClientResource =>
    layout.client.register({
        name: pods.appbar.name,
        uri: pods.appbar.uri,
    });

export const registerMenuPod = (pods: AppBarMenuMainLayout, layout: Layout): PodiumClientResource =>
    layout.client.register({
        name: pods.menu.name,
        uri: pods.menu.uri,
    });

export const registerPods = (pods: Pod[], appBar: PodiumClientResource, menu: PodiumClientResource, layout: Layout, app: Express) =>
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