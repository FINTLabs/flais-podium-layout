import express from "express";
import morgan from "morgan";
import prometheusMiddleware from "express-prometheus-middleware";
import Layout from "@podium/layout";
import {log} from "./logger";


export const setupExpress = (layout: Layout) => {
    const app = express();
    app.use(morgan("combined"));
    app.use(
        prometheusMiddleware({
            collectDefaultMetrics: true,
        })
    );

    app.use("/static", express.static("static"));
    log.info("Mounting layout on path: ", layout.pathname());
    app.use(layout.pathname(), layout.middleware());

    return app;
};
