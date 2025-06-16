/**
 * Parse Output Utility
 * src/utils/ParseOutput.ts
 * 
 * Formats and displays result(s) from commands.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

'use strict';

import { type Command } from 'commander';
import fs from 'fs';
import chalk from 'chalk';

export function parseOutput ( out: any, cmd: Command ) : void {

    const { output } = cmd.parent!.opts();

    if ( output ) {

        out = typeof output === 'string' ? out : JSON.stringify( out, null, 2 ) as string;

        try { fs.writeFileSync( output, out, 'utf-8' ) } catch ( err: any ) {

            console.error( chalk.red( `Failed to write output: ${err.message}` ) );
            process.exit( 1 );

        }

        console.log( chalk.green( `Result written to <${output}>` ) );

    } else {

        console.log( out );

    }

}