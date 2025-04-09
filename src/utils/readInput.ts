/**
 * Module `readInput` for `cmpstr-cli`
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

/**
 * module dependencies
 * @private
 */

import { promises as fs } from 'fs';

/**
 * reads input as direct string or path to file and returns plain text
 * @public
 * 
 * @param {string} source path to file or plain string
 * @returns {string} text
 */

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