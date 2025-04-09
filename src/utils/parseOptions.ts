/**
 * Module `parseOptions` for `cmpstr-cli`
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

/**
 * parse JSON options
 * @public
 * 
 * @param {string|undefined} options JSON options
 * @returns {Record<string, any>|undefined} parsed options or undefined
 * @throws {Error} if --options provides invalide JSON
 */

export function parseOptions ( options: string | undefined ) : Record<string, any> | undefined {

    if ( !options ) {

        return undefined as undefined;

    }

    try {

        return JSON.parse( options ) as Record<string, any>;

    } catch {

        throw new Error (
            `Invalid JSON provided in --options`
        );

    }

}