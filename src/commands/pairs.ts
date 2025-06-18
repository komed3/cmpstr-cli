/**
 * @fileoverview
 * Pairs command for CmpStr CLI.
 * 
 * Compares elements at the same index in two lists and returns
 * similarity scores. Supports both synchronous and asynchronous
 * processing and verbose output.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveListInput } from '../utils/input.js';
import { output } from '../utils/output.js';

/**
 * Compares elements at the same index in two lists and
 * outputs similarity scores.
 * 
 * @async
 * @param {string} a - The first list as a string or file path.
 * @param {string} b - The second list as a string or file path.
 * @param {Record<string, any>} [opt] - Additional options for comparison.
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise<void>}
 */
export async function pairs (
    a: string, b: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const {
        async = false, verbose = false, delimiter = ',',
        metric = 'levenshtein', flags = ''
    } = config;

    const A = await resolveListInput( a, delimiter );
    const B = await resolveListInput( b, delimiter );

    const cmp = CmpStrAsync
        .create()
        .setRaw( verbose )
        .setMetric( metric )
        .setFlags( flags );

    output( config, cmd, async
        ? await cmp.pairsAsync( A, B )
        : cmp.pairs( A, B )
    );

}