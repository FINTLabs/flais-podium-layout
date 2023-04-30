import {PodiumClientResource} from "@podium/client";

export interface Options {

    /**
     * Name of the layout
     */
    layoutName: string;
    /**
     * Exact location of the pods file.
     */
    podsFile: string;
    /**
     * Port for the layout service.
     */
    layoutPort: number;
    /**
     * Base path of the layout service.
     */
    layoutPathName: string;
    /**
     * Determent if we run in development mode or not.
     */
    isDevelopment?: boolean;
    /**
     * Logging level of the layout service.
     */
    loggingLevel?: string;
    /**
     * Podium layout debugging.
     */
    layoutDebug?: boolean;

}

export class DefaultOptions implements Options {

    /**
     * @param layoutName Name that the layout identifies itself by
     * @param podsFile 	JSON file that defines the pods. See {@link AppBarMenuMainLayout}
     * @param basePath 	Pathname of where a layout is mounted in an HTTP server
     */
    constructor(layoutName: string, podsFile?: string, basePath?: string) {
        this.layoutName = layoutName;
        if (podsFile) {
            this.podsFile = podsFile;
        }

        if (basePath) {
            this.layoutPathName = basePath;
        }
    }

    /**
     * @default false
     */
    isDevelopment = false;

    /**
     * @default false
     */
    layoutDebug = false;
    /**
     *
     */
    layoutName: string;
    /**
     * @default /
     */
    layoutPathName = '/';

    /**
     * @default 7000
     */
    layoutPort = 3000;
    /**
     * @default info
     */
    loggingLevel = 'info';

    /**
     * @default ./pods.json
     */
    podsFile = './pods.json';
}


/**
 * Represents a AppBar, Menu, Main/features layout.
 * @example
 * ```json
 * {
 *   "appbar": {
 *     "name": "fint-kontroll-appbar-pod",
 *     "uri": "http://fint-kontroll-appbar-pod:7100/manifest.json"
 *   },
 *   "menu": {
 *     "name": "fint-kontroll-menu-pod",
 *     "uri": "http://fint-kontroll-appbar-pod:7100/manifest.json"
 *   },
 *   "main": [
 *     {
 *       "name": "fint-kontroll-groups-pod",
 *       "uri": "http://fint-kontroll-groups-pod:7100/manifest.json"
 *     }
 *   ]
 * }
 * ```
 */
export interface AppBarMenuMainLayout {
    /**
     * The AppBar {@link Pod}
     */
    appbar: Pod;
    /**
     * The Menu {@link Pod}
     */
    menu: Pod;
    /**
     * A list of main/feature {@link Pod}s
     */
    main: Pod[];
}

/**
 * Represents a podlet.
 * @example
 * ```json
 * {
 *   "name": "fint-kontroll-groups-pod",
 *   "uri": "http://fint-kontroll-groups-pod:7100/manifest.json",
 *   "title": "Grupper"
 * }
 * ```
 */
export interface Pod {
    /**
     * Name of the pod. Need to be the same as the `id` of the podlet.
     */
    name: string;
    /**
     * Url of the manifest for the pod.
     */
    uri: string;
    /**
     * Title to be shown in the browser.
     */
    title?: string;

    path: string;
}

export interface MainPodClientResource {
    pod: Pod;
    resource: PodiumClientResource
}