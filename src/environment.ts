/**
 * Determent if we run in development mode or not. It is `true` if `NODE_ENV === 'development'`
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
/**
 * Sets the K8S environment. Is used to build production asset url's.
 * @see {@link createBaseAssetUri} for more information
 * @default `alpha`
 */
export const K8S_CLUSTER = process.env.K8S_CLUSTER || "alpha";
/**
 * Port for the layout service.
 * @default `7100`
 */
export const LAYOUT_PORT = process.env.LAYOUT_PORT || 7100;
/**
 * Pathname of where a Layout is mounted in an HTTP server.
 * @default `/`
 */
export const LAYOUT_PATH_NAME = process.env.LAYOUT_PATHNAME || "/";
/**
 * Logging level.
 * @default `info`
 */
export const LOGGING_LEVEL = process.env.LOGGING_LEVEL || "info";
/**
 *
 */
export const PODS_FILE = process.env.LOGGING_LEVEL || "./pods.json";
/**
 * Layout debug
 * @default `false`
 */
export const LAYOUT_DEBUG = process.env.LAYOUT_DEBUG || false;
