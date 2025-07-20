/**
 * @fileoverview
 * Index command for CmpStr CLI.
 * 
 * Computes the phonetic representation of the given input string using
 * the selected algorithm and options. Supports both synchronous and
 * asynchronous processing.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

/**
 * Computes the phonetic representation of the given input string.
 * 
 * @async
 * @param {string} input - The input string or file path.
 * @param {Record<string, any>} [opt] - Phonetic options.
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise<void>}
 */
export async function index (
    input: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, { phonetic: opt } );

    const { algo, ...opts } = config.phonetic ?? {};

    input = await resolveInput( input );

    const cmp = CmpStrAsync.create();

    output( config, cmd, config.async
        ? await cmp.phoneticIndexAsync( input, algo, opts )
        : cmp.phoneticIndex( input, algo, opts )
    );

}
