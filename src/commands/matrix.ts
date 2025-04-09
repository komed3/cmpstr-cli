/**
 * Command `matrix` for `cmpstr-cli`
 * 
 * Returns the 2D array representing the
 * similarity matrix.
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
import { readList } from '../utils/readList.js';
import { parseOutput } from '../utils/parseOutput.js';

export async function matrix (
    a: string,
    options: Record<string, any>,
    cmd: Command
) : Promise<void> {

    const cfg = mergeConfig(
        options,
        await loadConfig( options?.config )
    );

    validateConfig( cfg );

    const list = await readList( a, cfg.delimiter );

    measurePerf.start();

    const cmp = new CmpStrAsync();

    const res = cfg.async
        ? await cmp.similarityMatrixAsync( cfg.algo || 'dice', list, cfg )
        : cmp.similarityMatrix( cfg.algo || 'dice', list, cfg );

    const perf = measurePerf.end();

    parseOutput( res, list, cfg, cmd, perf );

}
