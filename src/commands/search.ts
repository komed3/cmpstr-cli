/**
 * @fileoverview
 * Search command for CmpStr CLI.
 * 
 * Performs a filtered and normalized substring search across a list of
 * strings. Supports both synchronous and asynchronous processing.
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
 * Performs a filtered and normalized substring search across the haystack.
 * 
 * @async
 * @param {string} a - The string to search for (needle).
 * @param {string} b - The list of strings to search in (haystack).
 * @param {Record<string, any>} [opt] - Additional search options.
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise<void>}
 */
export async function search (
    a: string, b: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const { async = false, delimiter = ',', flags = '' } = config;

    const needle = await resolveInput( a );
    const haystack = await resolveListInput( b, delimiter );

    const cmp = CmpStrAsync.create();

    output( config, cmd, async
        ? await cmp.searchAsync( needle, haystack, flags )
        : cmp.search( needle, haystack, flags )
    );

}
