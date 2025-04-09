/**
 * Module `readList` for `cmpstr-cli`
 * 
 * Reads input as list.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { readInput } from './readInput.js';

export async function readList ( source: string ) : Promise<string[]> {

    try {

        const text = await readInput ( source );

        return text.split(
            /\n/.exec( text ) ? /\r?\n/ : /\,/
        ).map( l => l.trim() ).filter( Boolean ) as string[];

    } catch {

        return [] as string[];

    }

}