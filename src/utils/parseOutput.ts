/**
 * Module `parseOutput` for `cmpstr-cli`
 * 
 * Formats and displays result(s) from commands.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { Command } from 'commander';
import { ConfigOptions } from '../types.js';

export function parseOutput (
    res: string | string[],
    input: string | string[],
    cfg: ConfigOptions,
    cmd: Command
) : void {

    if ( cfg.verbose ) {

        //

    } else {

        console.log( res );

    }

}