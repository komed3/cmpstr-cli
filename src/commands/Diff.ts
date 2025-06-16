'use strict';

import { type Command } from 'commander';
import { DiffChecker } from 'cmpstr';
import { resolveInput } from '../utils/ResolveInput.js';
import { parseOutput } from '../utils/ParseOutput.js';

export async function diff ( a: string, b: string, opt: Record<string, any> = {}, cmd: Command ) : Promise<void> {

    const { output } = cmd.parent!.opts();

    const diff = new DiffChecker (
        await resolveInput( a ),
        await resolveInput( b ),
        {
            mode: opt?.mode ?? 'word',
            caseInsensitive: opt?.insensitive,
            contextLines: Number( opt?.lines ?? 1 ),
            groupedLines: ! ( opt?.single ),
            expandLines: opt?.all
        }
    );

    parseOutput( output ? diff.getASCIIDiff() : diff.getCLIDiff(), cmd );

}