'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput, resolveListInput } from '../utils/input.js';
import { output } from '../utils/output.js';

export async function match (
    a: string | string[], b: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const {
        async = false, verbose = false, list = false, delimiter = ',',
        metric = 'levenshtein', flags = '',
        threshold = 0, sort = 'desc', n = Infinity
    } = config;

    a = list ? await resolveListInput( a as string, delimiter ) : await resolveInput( a as string );
    b = await resolveInput( b );

    const cmp = CmpStrAsync
        .create()
        .setRaw( verbose )
        .setMetric( metric )
        .setFlags( flags );

    let res = async
        ? await cmp.matchAsync( a, b, threshold )
        : cmp.match( a, b, threshold );

    res = res.sort( ( a: any, b: any ) => verbose
        ? sort === 'asc' ? a.res - b.res : b.res - a.res
        : sort === 'asc' ? a.match - b.match : b.match - a.match
    ).slice( 0, n );

    output( config, cmd, verbose ? JSON.stringify( res ) : res );

}