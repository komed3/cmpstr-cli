'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveListInput } from '../utils/input.js';
import { output } from '../utils/output.js';

export async function matrix (
    input: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const { async = false, delimiter = ',', metric = 'levenshtein', flags = '' } = config;

    const list = await resolveListInput( input, delimiter );

    const cmp = CmpStrAsync.create().setMetric( metric ).setFlags( flags );

    output( config, cmd, async
        ? await cmp.matrixAsync( list )
        : cmp.matrix( list )
    );

}