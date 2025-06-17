'use strict';

import type { Config } from './types.js';
import { type Command } from 'commander';
import * as fs from 'node:fs/promises';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

export async function output ( cfg: Partial<Config>, cmd: Command, out: any ) : Promise<void> {

    const { verbose = false, output = undefined } = cfg ?? {};

    if ( verbose ) {

        out =
            chalk.yellow( '[INPUT]' ) + '\n' + 'cmpstr ' + cmd.parent!.args.join( ' ' ) + '\n\n' +
            chalk.yellow( '[OPTIONS]' ) + '\n' + JSON.stringify( cfg, null, 2 ) + '\n\n' +
            chalk.yellow( '[RESULT]' ) + '\n' + out;

    }

    if ( output ) {

        try { fs.writeFile( output, stripAnsi( out ), 'utf-8' ) }
        catch ( err: any ) { throw new Error ( `Failed to write output: ${ err.message }` ) }

        console.log( chalk.green( `Result written to <${ output }>` ) );

    }

    else console.log( out );

}