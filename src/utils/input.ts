/**
 * @fileoverview
 * Input utilities for CmpStr CLI.
 * 
 * Provides functions to resolve string or file input and
 * to parse lists from input.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import * as fs from 'node:fs/promises';

/**
 * Resolves the input string.
 * If the input is a path to a readable file, reads and returns its trimmed content.
 * Otherwise, returns the trimmed input string itself.
 * 
 * @async
 * @param {string} input - The input string or file path.
 * @returns {Promise<string>} The resolved input content.
 */
export async function resolveInput ( input: string ) : Promise<string> {

    try {

        // Check if input is a file path by attempting to access it
        await fs.access( input );

        // If accessible, read and return file content
        return ( await fs.readFile( input, 'utf-8' ) ).trim();

    } catch {

        // If not a file, return the trimmed input string
        return input.trim();

    }

}

/**
 * Resolves a list of strings from input.
 * If the input is a file, reads and splits its content by line or delimiter.
 * If the input is a string, splits by delimiter.
 * 
 * @async
 * @param {string} input - The input string or file path.
 * @param {string} [delimiter=','] - The delimiter to use for splitting (default: `,`).
 * @returns {Promise<string[]>} The resolved list of strings.
 */
export async function resolveListInput ( input: string, delimiter: string = ',' ) : Promise<string[]> {

    try {

        const text = await resolveInput( input );

        // If input contains line breaks, split by line; otherwise, use delimiter
        return text.split( /\n/.exec( text ) ? /\r?\n/ : delimiter ).map( s => s.trim() ).filter( Boolean );

    } catch {

        // On error, return an empty list
        return [];

    }

}