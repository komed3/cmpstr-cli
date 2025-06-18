'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput, resolveListInput } from '../utils/input.js';
import { output } from '../utils/output.js';

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