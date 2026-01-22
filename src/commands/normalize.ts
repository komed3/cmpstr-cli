/**
 * @fileoverview
 * Normalize command for CmpStr CLI.
 * 
 * Normalizes the input string using the specified normalization flags.
 * Supports both synchronous and asynchronous processing.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { Normalizer } from 'cmpstr';
import { type Command } from 'commander';

import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

/**
 * Normalizes the input string according to the specified flags.
 * 
 * @async
 * @param {string} input - The input string or file path to normalize.
 * @param {Record< string, any >} [opt] - Normalization options.
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise< void >}
 */
export async function normalize (
    input: string,
    opt: Record< string, any > = Object.create( null ),
    cmd: Command
) : Promise< void > {
    const config = await cfg( cmd, opt );
    const { async = false, flags = '' } = config;
    const text = await resolveInput( input );

    await output( config, cmd, async
        ? await Normalizer.normalizeAsync( text, flags )
        : Normalizer.normalize( text, flags )
    );
}
