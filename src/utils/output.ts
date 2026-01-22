/**
 * @fileoverview
 * Output utility for CmpStr CLI.
 * 
 * Handles writing results to stdout or a file, with optional
 * verbose mode and ANSI color stripping.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { writeFile } from 'node:fs/promises';

import chalk from 'chalk';
import { type Command } from 'commander';
import stripAnsi from 'strip-ansi';

import type { Config } from './types.js';

/**
 * Outputs the result to the console or writes it to a file.
 * In verbose mode, includes input, options, and result sections.
 * Strips ANSI color codes when writing to a file.
 * 
 * @async
 * @param {Partial< Config >} cfg - The resolved configuration object.
 * @param {Command} cmd - The Commander command instance.
 * @param {any} out - The output to display or write.
 * @throws {Error} If writing to the file fails.
 */
export async function output ( cfg: Partial< Config >, cmd: Command, out: any ) : Promise< void > {
    const { verbose = false, output = undefined } = cfg ?? {};

    // If verbose, prepend input and options information to the output
    if ( verbose ) out =
        chalk.yellow( '[INPUT]' ) + '\n' + 'cmpstr ' + cmd.parent!.args.join( ' ' ) + '\n\n' +
        chalk.yellow( '[OPTIONS]' ) + '\n' + JSON.stringify( cfg, null, 2 ) + '\n\n' +
        chalk.yellow( '[RESULT]' ) + '\n' + out;

    if ( output ) {
        // Write output to file, stripping ANSI color codes
        try { await writeFile( output, stripAnsi( out ), 'utf-8' ) }
        catch ( err ) { throw new Error (
            `Failed to write output: ${ ( err as unknown as Error ).message }`, { cause: err }
        ) }

        console.log( chalk.green( `Result written to <${ output }>` ) );
    }

    // Output to console (with colors, if present)
    else console.log( out );
}
