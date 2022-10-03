import { ImportJson } from "./ImportJson.mjs";

/** @typedef {import("../../../../flux-fetch-api/src/Adapter/Api/FetchApi.mjs").FetchApi} FetchApi */
/** @typedef {import("../Cache/JsonCache.mjs").JsonCache} JsonCache */

export class FetchImportJson extends ImportJson {
    /**
     * @type {FetchApi}
     */
    #fetch_api;
    /**
     * @type {JsonCache}
     */
    #json_cache;

    /**
     * @param {FetchApi} fetch_api
     * @param {JsonCache} json_cache
     * @returns {FetchImportJson}
     */
    static new(fetch_api, json_cache) {
        return new this(
            fetch_api,
            json_cache
        );
    }

    /**
     * @param {FetchApi} fetch_api
     * @param {JsonCache} json_cache
     * @private
     */
    constructor(fetch_api, json_cache) {
        super();

        this.#fetch_api = fetch_api;
        this.#json_cache = json_cache;
    }

    /**
     * @param {string} url
     * @returns {Promise<*>}
     */
    async importJson(url) {
        let data;

        if (this.#json_cache.has(url)) {
            data = this.#json_cache.get(url);
        } else {
            data = await this.#fetch_api.fetch(
                {
                    url,
                    no_ui: true
                }
            );
            this.#json_cache.set(url, data);
        }

        return data;
    }
}
