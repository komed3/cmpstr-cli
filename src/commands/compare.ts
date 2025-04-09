/**
 * Command `compare` for `cmpstr-cli`
 * 
 * Compares two strings and returns their
 * similarity score.
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
) : Promise<void> {

    const cfg = mergeConfig(
        options,
        await loadConfig( options?.config )
    );

    validateConfig( cfg );

    const [ base, test ] = await Promise.all( [
        readInput( a ),
        readInput( b )
    ] );

    measurePerf.start();

    const cmp = new CmpStrAsync(
        cfg.algo || 'dice',
        base
    );

    const res = cfg.async
        ? await cmp.testAsync( test, cfg )
        : cmp.test( test, cfg );

    const perf = measurePerf.end();

    parseOutput( res.toString(), [ base, test ], cfg, cmd, perf );

}