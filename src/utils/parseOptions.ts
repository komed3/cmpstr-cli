/**
 * Module `parseOptions` for `cmpstr-cli`
 * 
 * Parses JSON options or throws new Error if
 * `--options` provides invalide JSON.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
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