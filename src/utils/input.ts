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