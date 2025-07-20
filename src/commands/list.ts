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

import { type Command } from 'commander';
import { CmpStr } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { output } from '../utils/output.js';

/**
 * Lists available metrics or phonetic algorithms.
 * 
 * @async
 * @param {'metric'|'phonetic'} key - The type of list to display.
 * @param {any} _ - Unused options parameter (Commander compatibility).
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise<void>}
 */
export async function list ( key: 'metric' | 'phonetic', _: any, cmd: Command ) : Promise<void> {

    output( await cfg( cmd ), cmd, CmpStr[ key ].list().join( ', ' ) );

}
