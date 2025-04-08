/**
 * Module `readList` for `cmpstr-cli`
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

/**
 * module dependencies
 * @private
 */

import { readInput } from './readInput';

/**
 * reads input as list
 * @public
 * 
 * @param {string} source path to file or plain string
 * @returns {Promise<string[]>} list
 */

export async function readList ( source: string ) : Promise<string[]> {

    try {

        const text = await readInput ( source );

        return text.split(
            /\n/.exec( text ) ? /\r?\n/ : /\,/
        ).map( l => l.trim() ).filter( Boolean );

    } catch {

        return [];

    }

}