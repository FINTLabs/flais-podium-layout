import {getPods, registerAppBarPod, registerMainPod, registerMenuPod, registerPods} from "./pod";
import {setupExpress} from "./http";
import {log} from "./logger";
import Layout from "@podium/layout";
import {createDocument} from "./html";
import {DefaultOptions, LayoutConfiguration, Options} from "./types";


const createLayout = (config: Options): Layout => {
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

export const startLayout = (layoutConfigUri: string, options?: Options) => {
    log.info("Getting layout configuration from: ", layoutConfigUri);
    getPods(layoutConfigUri)
        .then(layoutConfiguration => {
            const optionsOrDefault = options === undefined
                ? new DefaultOptions(layoutConfiguration.name, layoutConfiguration.basePath)
                : applyLayoutConfigurationToOption(options, layoutConfiguration);

            const pods = layoutConfiguration.appBarMenuMainLayout;
            log.info("Layout configuration:", JSON.stringify(layoutConfiguration));
            log.info("Options:", JSON.stringify(optionsOrDefault));
            const layout = createLayout(optionsOrDefault);
            const app = setupExpress(layout);

            registerPods(registerMainPod(pods.main, layout), registerAppBarPod(pods, layout), registerMenuPod(pods, layout), layout, app);

            app.listen(optionsOrDefault.layoutPort, () => {
                log.info("Layout server started!");
                log.info(`http://localhost:${optionsOrDefault.layoutPort}${optionsOrDefault.layoutPathName}`);
            });
        })
};

const applyLayoutConfigurationToOption = (options: Options, layoutConfiguration: LayoutConfiguration): Options => {
    options.layoutName = layoutConfiguration.name;
    options.layoutPathName = layoutConfiguration.basePath;

    return options;
}

