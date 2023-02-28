import {getPods, registerAppBarPod, registerMenuPod, registerPods} from "./pod";
import {setupExpress} from "./http";
import {log} from "./logger";
import Layout from "@podium/layout";
import {createDocument} from "./html";
import {Options} from "./types";


const createLayout = (config: Options) : Layout => {
    const layout = new Layout({
        name: config.layoutName,
        pathname: config.layoutPathName,
        logger: log,
        context: {
            debug: {
                enabled: config.layoutDebug,
            },
        },
    });

    layout.view((incoming, content) => createDocument(incoming, content));

    return layout;
}

export const startLayout = (options: Options) => {
    const pods = getPods(options.podsFile);
    log.info("Pods:", pods)
    const layout = createLayout(options)
    const app = setupExpress(layout);

    registerPods(pods.main, registerAppBarPod(pods, layout), registerMenuPod(pods, layout), layout, app);

    app.listen(options.layoutPort, () => {
        log.info("Layout server started!");
        log.info(`http://localhost:${options.layoutPort}`);
    });
};


