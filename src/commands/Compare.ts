'use strict';

import { type Command } from 'commander';
import { CmpStrAsync } from 'cmpstr';
import { resolveInput } from '../utils/ResolveInput.js';
import { parseOutput } from '../utils/ParseOutput.js';

export async function compare ( a: string, b: string, opt: Record<string, any> = {}, cmd: Command ) : Promise<void> {

    const { flags = '', metric = 'levenshtein' } = opt;
    const { async, verbose } = cmd.parent!.opts();

    a = await resolveInput( a ), b = await resolveInput( b );

    const cmp = CmpStrAsync.create( { raw: !! verbose, flags, metric } );

    parseOutput( async ? await cmp.compareAsync( a, b ) : cmp.compare( a, b ), cmd );

}