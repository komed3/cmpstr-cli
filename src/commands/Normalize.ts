'use strict';

import { Normalizer } from 'cmpstr';
import { resolveInput } from '../utils/ResolveInput.js';

export async function normalize ( input: string, opt?: Record<string, any> ) : Promise<void> {

    const MAP = {
        nfd: 'd', nfc: 'u', nfkc: 'x', collaps: 'w', trim: 't', dedupt: 'r',
        special: 's', nolet: 'k', nonum: 'n', insensitive: 'i'
    };

    const flags = opt?.flags ?? Object.keys( opt ?? {} ).map(
        ( f ) => MAP[ f as keyof typeof MAP ] ?? ''
    ).join( '' );

    console.log( Normalizer.normalize( await resolveInput( input ), flags ) );

}