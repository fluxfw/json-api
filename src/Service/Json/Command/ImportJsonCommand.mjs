import { ImportJson } from "../../../Adapter/ImportJson/ImportJson.mjs";

export class ImportJsonCommand {
    /**
     * @type {ImportJson}
     */
    #import_json;

    /**
     * @param {ImportJson} import_json
     * @returns {ImportJsonCommand}
     */
    static new(import_json) {
        return new this(
            import_json
        );
    }

    /**
     * @param {ImportJson} import_json
     * @private
     */
    constructor(import_json) {
        this.#import_json = import_json;
    }

    /**
     * @param {string} url
     * @returns {Promise<*>}
     */
    async importJson(url) {
        return this.#import_json.importJson(
            url
        );
    }
}
