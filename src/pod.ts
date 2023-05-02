import {
    AppBarMenuMainLayout,
    LayoutConfiguration,
    MainPodClientResource,
    Pod,
} from './types';
import Layout from '@podium/layout';
import { PodiumClientResource } from '@podium/client';
import { Express } from 'express';
import { bodyTemplate } from './html';
import axios from 'axios';

export const getPods = (podsFile: string): Promise<LayoutConfiguration> => {
    try {
        const url = new URL(podsFile);

        return axios
            .get<LayoutConfiguration>(url.toString())
            .then((response) => response.data);
    } catch (err) {
        /* eslint-disable */
        return Promise.resolve<LayoutConfiguration>(require(podsFile));
    }
};
export const registerAppBarPod = (
    pods: AppBarMenuMainLayout,
    layout: Layout,
): PodiumClientResource =>
    layout.client.register({
        name: pods.appbar.name,
        uri: pods.appbar.uri,
    });

export const registerMenuPod = (
    pods: AppBarMenuMainLayout,
    layout: Layout,
): PodiumClientResource =>
    layout.client.register({
        name: pods.menu.name,
        uri: pods.menu.uri,
    });

export const registerMainPod = (
    pods: Pod[],
    layout: Layout,
): MainPodClientResource[] =>
    pods.map((pod) => {
        return {
            pod: pod,
            resource: layout.client.register({
                name: pod.name,
                uri: pod.uri,
                throwable: true,
            }),
        };
    });

export const registerPods = (
    pods: MainPodClientResource[],
    appBar: PodiumClientResource,
    menu: PodiumClientResource,
    layout: Layout,
    app: Express,
) =>
    pods.forEach((mainPod) => {
        app.get(mainPod.pod.path, async (req, res) => {
            try {
                const incoming = res.locals.podium;
                const [appBarPod, menuPod, main] = await Promise.all([
                    appBar.fetch(incoming),
                    menu.fetch(incoming),
                    mainPod.resource.fetch(incoming),
                ]);

                incoming.podlets = [appBarPod, menuPod, main];

                res.podiumSend(bodyTemplate(appBarPod, menuPod, main));
            } catch (err) {
                res.status(500).send(
                    `${mainPod.pod.name} er for tiden ikke tilgjengelig. Prøv igjen senere.`,
                );
            }
        });
    });
