/**
 * Module `mergeOptions` for `cmpstr-cli`
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

/**
 * merge CLI and config options
 * @public
 * 
 * @param {Record<string, any>} cli CLI options
 * @param {Record<string, any>} config config options
 * @returns {Record<string, any>} merged options
 */

export function mergeOptions ( cli: Record<string, any>, config: Record<string, any> ) : Record<string, any> {

    return {
        ...config,
        ...cli
    };

}