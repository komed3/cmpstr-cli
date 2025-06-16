'use strict';

import { type Command } from 'commander';
import { Normalizer } from 'cmpstr';
import { resolveInput } from '../utils/ResolveInput.js';
import { output } from '../utils/Output.js';

export async function normalize ( input: string, opt: Record<string, any> = {}, cmd: Command ) : Promise<void> {

    const { async = false } = cmd.parent!.opts();

    const MAP = {
        nfd: 'd', nfc: 'u', nfkc: 'x', collaps: 'w', trim: 't', dedupt: 'r',
        special: 's', nolet: 'k', nonum: 'n', insensitive: 'i'
    };

    const flags = opt?.flags ?? Object.keys( opt ?? {} ).map(
        ( f ) => MAP[ f as keyof typeof MAP ] ?? ''
    ).join( '' );

    const text = await resolveInput( input );

    const res = async
        ? await Normalizer.normalizeAsync( text, flags )
        : Normalizer.normalize( text, flags );

    output( res, cmd );

}