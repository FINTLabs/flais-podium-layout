import express from "express";
import morgan from "morgan";
import prometheusMiddleware from "express-prometheus-middleware";
import Layout from "@podium/layout";

export const setupExpress = (layout: Layout) => {
    const app = express();
    app.use(morgan("combined"));
    app.use(
        prometheusMiddleware({
            collectDefaultMetrics: true,
        })
    );

    app.use("/static", express.static("static"));
    app.use(layout.middleware());

    return app;
};
