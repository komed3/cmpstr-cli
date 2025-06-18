/**
 * @fileoverview
 * Matrix command for CmpStr CLI.
 * 
 * Computes a similarity matrix for all combinations within the input list.
 * Supports both synchronous and asynchronous processing.
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
 * Computes a similarity matrix for all combinations within the input list.
 * 
 * @async
 * @param {string} input - The input list as a string or file path.
 * @param {Record<string, any>} [opt] - Additional matrix options.
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise<void>}
 */
export async function matrix (
    input: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const { async = false, delimiter = ',', metric = 'levenshtein', flags = '' } = config;

    const list = await resolveListInput( input, delimiter );

    const cmp = CmpStrAsync.create().setMetric( metric ).setFlags( flags );

    output( config, cmd, async
        ? await cmp.matrixAsync( list )
        : cmp.matrix( list )
    );

}