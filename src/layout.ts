import {getPods, registerAppBarPod, registerMenuPod, registerPods} from "./pod";
import {setupExpress} from "./http";
import {log} from "./logger";
import {LAYOUT_DEBUG, LAYOUT_PATH_NAME, LAYOUT_PORT, PODS_FILE} from "./environment";
import Layout from "@podium/layout";
import {createDocument} from "./html";


const createLayout = (layoutName: string) : Layout => {
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

export const startLayout = (layoutName: string) => {
    const pods = getPods(PODS_FILE);
    log.info("Pods:", pods)
    const layout = createLayout(layoutName)
    const app = setupExpress(layout);

    registerPods(pods.main, registerAppBarPod(pods, layout), registerMenuPod(pods, layout), layout, app);

    app.listen(LAYOUT_PORT, () => {
        log.info("Layout server started!");
        log.info(`http://localhost:${LAYOUT_PORT}`);
    });
};


