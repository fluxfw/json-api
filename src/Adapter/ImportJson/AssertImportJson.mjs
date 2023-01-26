import { ImportJson } from "./ImportJson.mjs";

export class AssertImportJson extends ImportJson {
    /**
     * @returns {AssertImportJson}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {
        super();
    }

    /**
     * @param {string} url
     * @returns {Promise<*>}
     */
    async importJson(url) {
        return (await import(url, { assert: { type: "json" } })).default;
    }
}
