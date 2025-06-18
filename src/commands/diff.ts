/**
 * @fileoverview
 * Diff command for CmpStr CLI.
 * 
 * Finds and marks the differences between two texts, supporting various
 * diff modes and options. Outputs either a colored CLI diff, ASCII diff
 * for files, or a structured diff in verbose mode.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { type Command } from 'commander';
import { DiffChecker } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

/**
 * Finds and marks the differences between two texts.
 * 
 * @async
 * @param {string} a - The original text or file path.
 * @param {string} b - The modified text or file path.
 * @param {Record<string, any>} [opt] - Diff options.
 * @param {Command} cmd - The Commander command instance.
 * @returns {Promise<void>}
 */
export async function diff (
    a: string, b: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, { diff: opt } );

    const {
        mode = 'word', insensitive = false, lines = 1,
        single = false, all = false
    } = config.diff ?? {};

    const diff = new DiffChecker (
        await resolveInput( a ),
        await resolveInput( b ),
        {
            mode,
            caseInsensitive: insensitive,
            contextLines: lines,
            groupedLines: ! single,
            expandLines: all
        }
    );

    output( config, cmd, config.verbose
        ? JSON.stringify( diff.getStructuredDiff(), null, 2 )
        : config.output ? diff.getASCIIDiff() : diff.getCLIDiff()
    );

}