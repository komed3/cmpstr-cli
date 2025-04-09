/**
 * Command `normalize` for `cmpstr-cli`
 * 
 * Normalizes a single string or a list of strings
 * using the cmpstr normalize() method.
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

export async function normalize (
    input: string,
    options : Record<string, any>,
    cmd: Command
) : Promise<void> {

    measurePerf.start();

    const cfg = mergeConfig(
        options,
        await loadConfig( options?.config )
    );

    validateConfig( cfg );

    const cmp = new CmpStrAsync ();

    const data = options.list || false
        ? await readList( input )
        : await readInput( input );

    const res = cfg.async
        ? await cmp.normalizeAsync( data, cfg?.flags )
        : cmp.normalize( data, cfg?.flags );

    const perf = measurePerf.end();

    parseOutput( res, input, cfg, cmd, perf );

}