import { JsonCache } from "../Cache/JsonCache.mjs";
import { JsonService } from "../../Service/Json/Port/JsonService.mjs";

/** @typedef {import("../../../../flux-fetch-api/src/Adapter/Api/FetchApi.mjs").FetchApi} FetchApi */
/** @typedef {import("../ImportJson/ImportJson.mjs").ImportJson} ImportJson */

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

        this.#import_json ??= await this.#getImportJson();

        this.#json_service ??= this.#getJsonService();
    }

    /**
     * @param {string} url
     * @returns {Promise<*>}
     */
    async importJson(url) {
        return this.#json_service.importJson(
            url
        );
    }

    /**
     * @returns {Promise<ImportJson>}
     */
    async #getImportJson() {
        /*try {
            return (await import("../ImportJson/AssertImportJson.mjs")).AssertImportJson.new();
        } catch (error) {
            console.info("Unsupported assert import - Using fetch fallback (", error, ")");*/

        return (await import("../ImportJson/FetchImportJson.mjs")).FetchImportJson.new(
            this.#fetch_api,
            this.#json_cache
        );
        //}
    }

    /**
     * @returns {JsonService}
     */
    #getJsonService() {
        return JsonService.new(
            this.#import_json
        );
    }
}
