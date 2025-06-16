'use strict';

import { type Command } from 'commander';
import { DiffChecker } from 'cmpstr';
import { resolveInput } from '../utils/ResolveInput.js';

export async function diff (
    a: string, b: string, opt: Record<string, any>, cmd: Command
) : Promise<void> {

    void [ opt, cmd ];

    const diff = new DiffChecker(
        await resolveInput( a ),
        await resolveInput( b )
    );

    console.log( diff.getCLIDiff() );

}