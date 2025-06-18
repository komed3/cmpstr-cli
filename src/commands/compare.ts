/**
 * @fileoverview
 * Compare command for CmpStr CLI.
 * 
 * Compares two strings using a selected similarity metric and outputs the result.
 * Supports both synchronous and asynchronous processing and verbose output.
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
 * Compares two input strings and outputs their similarity score.
 * 
 * @async
 * @param {string} a - The first input string or file path.
 * @param {string} b - The second input string or file path.
 * @param {Record<string, any>} [opt] - Additional options for comparison.
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise<void>}
 */
export async function compare (
    a: string, b: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const { async = false, verbose = false, metric = 'levenshtein', flags = '' } = config;

    a = await resolveInput( a );
    b = await resolveInput( b );

    const cmp = CmpStrAsync
        .create()
        .setRaw( verbose )
        .setMetric( metric )
        .setFlags( flags );

    if ( verbose ) output( config, cmd, JSON.stringify( async
        ? await cmp.testAsync( a, b )
        : cmp.test( a, b )
    ) );

    else output( config, cmd, async
        ? await cmp.compareAsync( a, b )
        : cmp.compare( a, b )
    );

}