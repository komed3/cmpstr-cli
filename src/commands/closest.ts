/**
 * Command `closest` for `cmpstr-cli`
 * 
 * Compares an array of strings against a
 * string, sorted by similarity.
 * 
 * @author Paul Köhler
 * @license MIT
 */

import { Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';

import * as measurePerf from '../utils/measurePerf.js';
import { loadConfig } from '../utils/loadConfig.js';
import { mergeConfig } from '../utils/mergeConfig.js';
import { validateConfig } from '../utils/validateConfig.js';
import { readInput } from '../utils/readInput.js';
import { readList } from '../utils/readList.js';
import { parseOutput } from '../utils/parseOutput.js';

export async function closest (
    a: string,
    b: string,
    options: Record<string, any>,
    cmd: Command
) : Promise<void> {

    const cfg = mergeConfig(
        options,
        await loadConfig( options?.config )
    );

    validateConfig( cfg );

    const [ base, list ] = await Promise.all( [
        readInput( a ),
        readList( b, cfg.delimiter )
    ] );

    measurePerf.start();

    const cmp = new CmpStrAsync(
        cfg.algo || 'dice',
        base
    );

    const res = cfg.async
        ? await cmp.closestAsync( list, cfg )
        : cmp.closest( list, cfg );

    const perf = measurePerf.end();

    parseOutput( res?.toString(), [ base, list ], cfg, cmd, perf );

}
