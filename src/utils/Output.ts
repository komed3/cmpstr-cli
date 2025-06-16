'use strict';

import { type Command } from 'commander';
import fs from 'fs';
import chalk from 'chalk';

export function output ( out: any, cmd: Command ) : void {

    const { output } = cmd.parent!.opts();

    out = typeof output === 'string' ? out : JSON.stringify( out, null, 2 ) as string;

    if ( output ) {

        try { fs.writeFileSync( output, out, 'utf-8' ) } catch ( err: any ) {

            console.error( chalk.red( `Failed to write output: ${err.message}` ) );
            process.exit( 1 );

        }

        console.log( chalk.green( `Result written to <${output}>` ) );

    } else {

        console.log( out );

    }

}