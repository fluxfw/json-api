import { JsonCache } from "../Cache/JsonCache.mjs";

/** @typedef {import("../../../../flux-fetch-api/src/Adapter/Api/FetchApi.mjs").FetchApi} FetchApi */
/** @typedef {import("../ImportJson/ImportJson.mjs").ImportJson} ImportJson */
/** @typedef {import("../../Service/Json/Port/JsonService.mjs").JsonService} JsonService */

export class JsonApi {
    /**
     * @type {FetchApi}
     */
    #fetch_api;
    /**
     * @type {ImportJson | null}
     */
    #import_json = null;
    /**
     * @type {JsonCache | null}
     */
    #json_cache = null;
    /**
     * @type {JsonService | null}
     */
    #json_service = null;

    /**
     * @param {FetchApi} fetch_api
     * @returns {JsonApi}
     */
    static new(fetch_api) {
        return new this(
            fetch_api
        );
    }

    /**
     * @param {FetchApi} fetch_api
     * @private
     */
    constructor(fetch_api) {
        this.#fetch_api = fetch_api;
    }

    /**
     * @returns {Promise<void>}
     */
    async init() {
        this.#json_cache ??= new JsonCache();
    }

    /**
     * @param {string} url
     * @returns {Promise<*>}
     */
    async importJson(url) {
        return (await this.#getJsonService()).importJson(
            url
        );
    }

    /**
     * @returns {Promise<ImportJson>}
     */
    async #getImportJson() {
        if (this.#import_json === null) {
            try {
                if (typeof process !== "undefined" || (navigator.userAgentData?.brands?.some(brand => brand.brand === "Chromium") ?? false)) {
                    this.#import_json ??= (await import("../ImportJson/AssertImportJson.mjs")).AssertImportJson.new();

                    return this.#import_json;
                }
            } catch (error) {
                console.error(error);
            }

            console.info("Unsupported assert import - Using fetch fallback");

            this.#import_json ??= (await import("../ImportJson/FetchImportJson.mjs")).FetchImportJson.new(
                this.#fetch_api,
                this.#json_cache
            );
        }

        return this.#import_json;
    }

    /**
     * @returns {Promise<JsonService>}
     */
    async #getJsonService() {
        this.#json_service ??= (await import("../../Service/Json/Port/JsonService.mjs")).JsonService.new(
            await this.#getImportJson()
        );

        return this.#json_service;
    }
}
