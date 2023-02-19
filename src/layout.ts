import {createLayout, getPods, registerAppBarPod, registerMenuPod, registerPods,} from "./utils";
import {setupExpress} from "./http";
import {log} from "./logger";
import {LAYOUT_PORT, PODS_FILE} from "./environment";


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
