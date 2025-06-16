'use strict';

import { DiffChecker } from 'cmpstr';
import { resolveInput } from '../utils/ResolveInput.js';

export async function diff ( a: string, b: string, opt?: Record<string, any> ) : Promise<void> {

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

    console.log( diff.getCLIDiff() );

}