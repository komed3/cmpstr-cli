'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

export async function index (
    input: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, { phonetic: opt } );

    const { algo, ...opts } = config.phonetic ?? {};

    const text = await resolveInput( input );

    const cmp = CmpStrAsync.create();

    output( config, cmd, config.async
        ? cmp.phoneticIndexAsync( text, algo, opts )
        : cmp.phoneticIndex( text, algo, opts ) );

}