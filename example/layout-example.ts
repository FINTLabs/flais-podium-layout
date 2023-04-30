import {DefaultOptions, startLayout} from "@fintlabs/flais-podium-layout";

startLayout(new DefaultOptions("example", `${process.cwd()}/pods.json`, "/foo") );