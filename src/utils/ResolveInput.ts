/**
 * Resolve Input Utility
 * src/utils/ResolveInput.ts
 * 
 * Reads input as direct string or path to file and returns plain text.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { promises as fs } from 'fs';

export async function resolveInput ( input: string ) : Promise<string> {

    try {

        await fs.access( input );

        return ( await fs.readFile( input, 'utf-8' ) ).trim();

    } catch {

        return input.trim();

    }

}