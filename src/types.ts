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
    layoutDebug?: boolean

}

export class DefaultOptions implements Options {

    /**
     * @param layoutName
     */
    constructor(layoutName: string, podsFile?: string) {
        this.layoutName = layoutName;
        if (podsFile) {
            this.podsFile = podsFile;
        }
    }

    /**
     * @default false
     */
    isDevelopment: boolean = false;

    /**
     * @default false
     */
    layoutDebug: boolean = false;
    /**
     *
     */
    layoutName: string;
    /**
     * @default /
     */
    layoutPathName: string = '/';

    /**
     * @default 7000
     */
    layoutPort: number = 3000;
    /**
     * @default info
     */
    loggingLevel: string = 'info';

    /**
     * @default ./pods.json
     */
    podsFile: string = './pods.json';
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