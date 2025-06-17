'use strict';

import { type Command } from 'commander';
import { DiffChecker } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

export async function diff (
    a: string, b: string,
    opt: Record<string, any> = {},
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
        ? diff.getStructuredDiff()
        : config.output
            ? diff.getASCIIDiff()
            : diff.getCLIDiff()
    );

}