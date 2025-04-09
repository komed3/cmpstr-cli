/**
 * Command `compare` for `cmpstr-cli`
 * 
 * Compares two strings and returns their similarity score.
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
import { parseOutput } from '../utils/parseOutput.js';

export async function compare (
    a: string,
    b: string,
    options: Record<string, any>,
    cmd: Command
): Promise<void> {

    measurePerf.start();

    const cfg = mergeConfig(
        options,
        await loadConfig( options?.config )
    );

    validateConfig( cfg );

    const cmp = new CmpStrAsync();

    const [ strA, strB ] = await Promise.all( [
        readInput( a ),
        readInput( b )
    ] );

    const res = cfg.async
        ? await cmp.compareAsync( cfg.algo || 'dice', strA, strB, cfg )
        : cmp.compare( cfg.algo || 'dice', strA, strB, cfg );

    const perf = measurePerf.end();

    parseOutput( res.toString(), [ strA, strB ], cfg, cmd, perf );

}
