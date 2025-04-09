/**
 * Module `validateConfig` for `cmpstr-cli`
 * 
 * Validates config options.
 * 
 * @author Paul Köhler (komed3)
 * @license MIT
 */

import { CmpStr } from 'cmpstr';
import { ConfigOptions } from '../types.js';

export function validateConfig ( cfg: ConfigOptions ) : boolean {

    const cmp = new CmpStr ();

    if ( cfg.algo && !cmp.isAlgo( cfg.algo ) ) {

        throw new Error (
            `Unknown algorithm: "${cfg.algo}"`
        );

    }

    if ( cfg.flags && /[^swrkntidu]/.test( cfg.flags ) ) {

        throw new Error (
            `Wrong normalization flags in "${cfg.flags}"`
        );

    }

    return true;

}