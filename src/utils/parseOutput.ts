/**
 * Module `parseOutput` for `cmpstr-cli`
 * 
 * Formats and displays result(s) from commands.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { ConfigOptions, PerfResult } from '../types.js';

export function parseOutput (
    res: string | string[],
    input: string | string[],
    cfg: ConfigOptions,
    cmd: Command,
    perf?: PerfResult
) : void {

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

        console.log( chalk.blue( 'Input:' ), Array.isArray( input ) ? input.join( ', ' ) : input );
        console.log( chalk.blue( 'Result:' ), Array.isArray( res ) ? res.join( ', ' ) : res );

        if ( perf ) {

            console.log();

            console.log( chalk.magenta( '--- Performance ---' ) );

            console.log( chalk.magenta( 'Execution time:' ), perf.time.toFixed( 2 ), 'ms' );
            console.log( chalk.magenta( 'Memory used:' ), ( perf.memory / 1024 ).toFixed( 2 ), 'kB' );

        }

        console.log();

    } else {

        console.log( res );

    }

}