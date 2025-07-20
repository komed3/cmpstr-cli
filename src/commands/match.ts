/**
 * @fileoverview
 * Match command for CmpStr CLI.
 * 
 * Compares a string or list of strings against a target string and
 * returns similarity scores. Supports sorting, thresholding, and both
 * synchronous and asynchronous processing.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput, resolveListInput } from '../utils/input.js';
import { output } from '../utils/output.js';

/**
 * Compares the second input against the first string or
 * list of strings based on similarity.
 * 
 * @async
 * @param {string} a - The base input string or list (as string or file path).
 * @param {string} b - The string to compare against.
 * @param {Record<string, any>} [opt] - Additional match options.
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise<void>}
 */
export async function match (
    a: string, b: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const {
        async = false, verbose = false, list = false, delimiter = ',',
        metric = 'levenshtein', flags = '',
        threshold = 0, sort = 'desc', n = Infinity
    } = config;

    const A = list ? await resolveListInput( a, delimiter ) : await resolveInput( a );
    const B = await resolveInput( b );

    const cmp = CmpStrAsync
        .create()
        .setRaw( verbose )
        .setMetric( metric )
        .setFlags( flags );

    let res = async
        ? await cmp.matchAsync( A, B, threshold )
        : cmp.match( A, B, threshold );

    res = res.sort( ( a: any, b: any ) => verbose
        ? sort === 'asc' ? a.res - b.res : b.res - a.res
        : sort === 'asc' ? a.match - b.match : b.match - a.match
    ).slice( 0, n );

    output( config, cmd, verbose ? JSON.stringify( res ) : res );

}
