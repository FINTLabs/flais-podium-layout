
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