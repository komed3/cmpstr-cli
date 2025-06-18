'use strict';

import * as fs from 'node:fs/promises';

export async function resolveInput ( input: string ) : Promise<string> {

    try {

        await fs.access( input );

        return ( await fs.readFile( input, 'utf-8' ) ).trim();

    } catch {

        return input.trim();

    }

}

export async function resolveListInput ( input: string, delimiter: string = ',' ) : Promise<string[]> {

    try {

        const text = await resolveInput( input );

        return text.split( /\n/.exec( text ) ? /\r?\n/ : delimiter ).map( s => s.trim() ).filter( Boolean );

    } catch {

        return [];

    }

}