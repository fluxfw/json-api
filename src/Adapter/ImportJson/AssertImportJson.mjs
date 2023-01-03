import { ASSERT_TYPE_JSON } from "../../../../flux-http-api/src/Adapter/AssertType/ASSERT_TYPE.mjs";
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
        return (await import(url, { assert: { type: ASSERT_TYPE_JSON } })).default;
    }
}
