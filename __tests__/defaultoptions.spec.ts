import {DefaultOptions} from "../src";

describe("When creating a DefaultOption object", () => {
    const opt = new DefaultOptions("test");

    it("it should have the default value for layoutPort ", () => {
        expect(opt.layoutPort).toBe(3000);
    });
    it("it should have the default value for loggingLevel", () => {
        expect(opt.loggingLevel).toBe('info');
    });

    it("it should have the default value for layoutPathName", () => {
        expect(opt.layoutPathName).toBe('/');
    });
    it("it should have the default value for layoutName", () => {
        expect(opt.layoutName).toBe('test');
    });
    it("it should have the default value for layoutDebug", () => {
        expect(opt.layoutDebug).toBe(false);
    });
    it("it should have the default value for isDevelopment", () => {
        expect(opt.isDevelopment).toBe(false);
    });
});