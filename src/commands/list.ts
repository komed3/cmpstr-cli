/**
 * @fileoverview
 * List command for CmpStr CLI.
 * 
 * Lists available similarity metrics or phonetic algorithms
 * supported by the library.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { CmpStr } from 'cmpstr';
import { type Command } from 'commander';

import { cfg } from '../utils/config.js';
import { output } from '../utils/output.js';

/**
 * Lists available metrics or phonetic algorithms.
 * 
 * @async
 * @param {'metric' | 'phonetic'} key - The type of list to display.
 * @param {any} _ - Unused options parameter (Commander compatibility).
 * @param {Command} cmd - The Commander command instance.
 */
export async function list ( key: 'metric' | 'phonetic', _: any, cmd: Command ) : Promise< void > {
    await output( await cfg( cmd ), cmd, CmpStr[ key ].list().join( ', ' ) );
}
