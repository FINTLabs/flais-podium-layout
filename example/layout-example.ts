import {DefaultOptions, startLayout} from "@fintlabs/flais-podium-layout";

startLayout(new DefaultOptions("example", "http://localhost:8080/api/layout/configuration")/*`${process.cwd()}/pods.json`, "/foo")*/);