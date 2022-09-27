/**
 * @interface
 */
export class ImportJson {
    /**
     * @param {string} url
     * @returns {Promise<*>}
     * @abstract
     */
    importJson(url) { }
}
