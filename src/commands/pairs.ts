'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveListInput } from '../utils/input.js';
import { output } from '../utils/output.js';

export async function pairs (
    a: string, b: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const {
        async = false, verbose = false, delimiter = ',',
        metric = 'levenshtein', flags = ''
    } = config;

    const A = await resolveListInput( a, delimiter );
    const B = await resolveListInput( b, delimiter );

    const cmp = CmpStrAsync
        .create()
        .setRaw( verbose )
        .setMetric( metric )
        .setFlags( flags );

    output( config, cmd, async
        ? await cmp.pairsAsync( A, B )
        : cmp.pairs( A, B )
    );

}