/**
 * Module `parseOutput` for `cmpstr-cli`
 * 
 * Formats and displays result(s) from commands.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { Command } from 'commander';
import fs from 'fs';
import chalk from 'chalk';

import { ConfigOptions, PerfResult } from '../types.js';

const output2Str = ( output: string | string[] ) : string => {

    return (
        Array.isArray( output )
            ? output.join( '\n' )
            : output
    ) as string;

};

export function parseOutput (
    res: string | string[],
    input: string | string[],
    cfg: ConfigOptions,
    cmd: Command,
    perf?: PerfResult
) : void {

    const output = output2Str( res );

    if ( cmd.opts().write ) {

        fs.writeFileSync( cmd.opts().write, output, 'utf-8' );

        if ( cfg.verbose ) {

            console.log();

            console.log( chalk.green( `Result written to "${cmd.opts().write}"` ) );

        }

    }

    if ( cfg.verbose ) {

        console.log();

        console.log( chalk.cyan.bold( '--- CmpStr Output ---' ) );

        console.log( chalk.blue( 'Command:' ), cmd.name() );
        console.log( chalk.blue( 'Algorithm:' ), cfg.algo || 'undefined' );
        console.log( chalk.blue( 'Flags:' ), cfg.flags || 'none' );
        console.log( chalk.blue( 'Async:' ), cfg.async ? 'yes' : 'no' );

        if ( cfg.options && Object.keys( cfg.options ).length > 0 ) {

            console.log( chalk.blue( 'Options:' ), JSON.stringify( cfg.options, null, 2 ) );

        }

        console.log( chalk.blue( 'Input:' ), output2Str( input ) );
        console.log( chalk.blue( 'Result:' ), output );

        if ( perf ) {

            console.log();

            console.log( chalk.magenta( '--- Performance ---' ) );

            console.log( chalk.magenta( 'Execution time:' ), perf.time.toFixed( 2 ), 'ms' );
            console.log( chalk.magenta( 'Memory used:' ), ( perf.memory / 1024 ).toFixed( 2 ), 'kB' );

        }

        console.log();

    } else {

        console.log( output );

    }

}