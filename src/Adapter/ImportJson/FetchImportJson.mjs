import { CONTENT_TYPE_JSON } from "../../../../flux-http-api/src/Adapter/ContentType/CONTENT_TYPE.mjs";
import { HEADER_ACCEPT } from "../../../../flux-http-api/src/Adapter/Header/HEADER.mjs";
import { HttpClientRequest } from "../../../../flux-http-api/src/Adapter/Client/HttpClientRequest.mjs";
import { ImportJson } from "./ImportJson.mjs";

/** @typedef {import("../../../../flux-http-api/src/Adapter/Api/HttpApi.mjs").HttpApi} HttpApi */
/** @typedef {import("../Cache/JsonCache.mjs").JsonCache} JsonCache */

export class FetchImportJson extends ImportJson {
    /**
     * @type {HttpApi}
     */
    #http_api;
    /**
     * @type {JsonCache}
     */
    #json_cache;

    /**
     * @param {HttpApi} http_api
     * @param {JsonCache} json_cache
     * @returns {FetchImportJson}
     */
    static new(http_api, json_cache) {
        return new this(
            http_api,
            json_cache
        );
    }

    /**
     * @param {HttpApi} http_api
     * @param {JsonCache} json_cache
     * @private
     */
    constructor(http_api, json_cache) {
        super();

        this.#http_api = http_api;
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
            data = await (await this.#http_api.fetch(
                HttpClientRequest.new(
                    url,
                    null,
                    null,
                    {
                        [HEADER_ACCEPT]: CONTENT_TYPE_JSON
                    }
                )
            )).body.json();
            this.#json_cache.set(url, data);
        }

        return data;
    }
}
