import {registerAppBarPod, registerMainPod, registerMenuPod} from "../src/pod";
import {AppBarMenuMainLayout, Pod} from "../src";
import Layout from "@podium/layout";
import {PodiumClientResource} from "@podium/client";


const appBarMenuMainLayout: AppBarMenuMainLayout = {
    appbar: {
        "name": "appbar-pod",
        "uri": "http://localhost:7100/manifest.json",
        "path": "/"
    }, main: [],
    menu: {
        "name": "menu-pod",
        "uri": "http://localhost:7102/manifest.json",
        "path": "/"
    }

}
describe("When register a AppBar pod", () => {
    const appBarPod = registerAppBarPod(appBarMenuMainLayout, new Layout({name: "foo", pathname: "bar"}));

    test("it should be defined", () => {
        expect(appBarPod).toBeDefined()
    });

    test("it should have the name from the AppBarMenuMainLayout", () => {
        expect(appBarPod.name).toContain(appBarMenuMainLayout.appbar.name)
    });

    test("it should have the uri from the AppBarMenuMainLayout", () => {
        expect(appBarPod.uri).toContain(appBarMenuMainLayout.appbar.uri)
    });
});

describe("When register a Menu pod", () => {

    const menuPod = registerMenuPod(appBarMenuMainLayout, new Layout({name: "foo", pathname: "bar"}));

    test("it should be defined", () => {
        expect(menuPod).toBeDefined()
    });

    test("it should have the name from the AppBarMenuMainLayout", () => {
        expect(menuPod.name).toContain(appBarMenuMainLayout.menu.name)
    });

    test("it should have the uri from the AppBarMenuMainLayout", () => {
        expect(menuPod.uri).toContain(appBarMenuMainLayout.menu.uri)
    });
});

describe("When register a Main pod", () => {
    const pod: Pod = {
        name: "mainPod",
        uri: "http://localhost:7103/manifest.json",
        path: "/"
    }
    const mainPod = registerMainPod(
        pod,
        new Layout({name: "foo", pathname: "bar"}));

    it("it should be defined", () => {
        expect(mainPod).toBeDefined()
    });

    it("it should have the name from the Pod", () => {
        expect(mainPod.name).toContain(pod.name)
    });

    it("it should have the uri from the Pod", () => {
        expect(mainPod.uri).toContain(pod.uri)
    });
});
