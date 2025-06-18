'use strict';

import { type Command } from 'commander';
import { Normalizer } from 'cmpstr';
import { cfg } from '../utils/config.js';
import { resolveInput } from '../utils/input.js';
import { output } from '../utils/output.js';

export async function normalize (
    input: string,
    opt: Record<string, any> = Object.create( null ),
    cmd: Command
) : Promise<void> {

    const config = await cfg( cmd, opt );

    const { async = false, flags = '' } = config;

    const text = await resolveInput( input );

    output( config, cmd, async
        ? await Normalizer.normalizeAsync( text, flags )
        : Normalizer.normalize( text, flags )
    );

}