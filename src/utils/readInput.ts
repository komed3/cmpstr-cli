/**
 * Module `readInput` for `cmpstr-cli`
 * 
 * Reads input as direct string or path to file and
 * returns plain text.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { promises as fs } from 'fs';

export async function readInput ( source: string ) : Promise<string> {

    try {

        await fs.access( source );

        return (
            await fs.readFile( source, 'utf-8' )
        ).trim() as string;

    } catch {

        return source.trim() as string;

    }

}