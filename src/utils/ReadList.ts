/**
 * Read List Utility
 * src/utils/ReadList.ts
 * 
 * Reads the input as a list, divided by the delimiter
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { resolveInput } from './ResolveInput.js';

export async function readList ( source: string, delimiter: string = ',' ) : Promise<string[]> {

    try {

        const text = await resolveInput( source );

        return text.split( /\n/.exec( text ) ? /\r?\n/ : delimiter ).map( l => l.trim() ).filter( Boolean );

    } catch {

        return [];

    }

}